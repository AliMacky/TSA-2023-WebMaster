from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import os
import numpy as np
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.preprocessing.image import load_img, img_to_array
import tensorflow as tf
import os

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/predict", methods=["POST"])
@cross_origin()
def predict():
    if request.method == "POST":
        file = request.files["file"]
        filename = secure_filename(file.filename)
        print(file)
        file.save(
            os.path.join(
                "backend/Images/",
                filename,
            )
        )
        answer, probability_results, category = getPrediction(filename)
        return jsonify({"prediction": answer, "probability": probability_results, "category": category})
    
@app.route("/test", methods=["GET"])
@cross_origin()
def test():
    return "<p>Got it!</p>"

def getPrediction(filename):
    model_path = "backend\model\optimized_model.tflite"

    # Load the model using TensorFlow Lite interpreter
    interpreter = tf.lite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()

    # Load and preprocess the image
    img = load_img(
        "backend/Images/" + filename,
        target_size=(180, 180),
    )
    img = img_to_array(img) / 255.0
    img = np.expand_dims(img, axis=0)

    # Set input tensor for the interpreter
    input_tensor_index = interpreter.get_input_details()[0]["index"]
    interpreter.set_tensor(input_tensor_index, img)

    # Run inference
    interpreter.invoke()

    # Get the output tensor
    output_tensor_index = interpreter.get_output_details()[0]["index"]
    predictions = interpreter.get_tensor(output_tensor_index)

    # Post-process the predictions
    category = int(np.argmax(predictions, axis=1))
    probability_results = 0

    if category == 1:
        answer = "Recycle"
        probability_results = predictions[0][1]
    elif category == 0:
        answer = "Compost"
        probability_results = predictions[0][0]

    probability_results = round(probability_results * 100)

    if probability_results < 85:
        answer = "Trash"
        category = 2

    probability_results = str(probability_results)
    os.remove(
        os.path.join(
            "backend/Images/",
            filename,
        )
    )
    return answer, probability_results, category


if __name__ == "__main__":
    app.run(debug=True, port=5000, host='0.0.0.0')