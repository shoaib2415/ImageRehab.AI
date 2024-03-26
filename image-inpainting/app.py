# from flask import Flask, request, jsonify
# import os
# from flask_cors import CORS
# import cv2
# import numpy as np
# from werkzeug.utils import secure_filename
# from inpainting_face import inpainting_face
# from flask import send_from_directory
# from pymongo import MongoClient
# app = Flask(__name__)
# CORS(app)

# UPLOAD_FOLDER = 'uploads'
# #MASKED_UPLOAD_FOLDER = 'masked_uploads'
# RESULT_FOLDER = 'results'
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# #app.config['MASKED_UPLOAD_FOLDER'] = MASKED_UPLOAD_FOLDER
# app.config['RESULT_FOLDER'] = RESULT_FOLDER

# output_folder = 'masked_images'
# os.makedirs(output_folder, exist_ok=True)

# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}


# client = MongoClient('mongodb+srv://shoaibm2415:shoaibm2415@cluster0.x0hugws.mongodb.net/image-inpainting')
# db = client['mydatabase']

# @app.route('/signup', methods=['POST'])
# def signup():
#     data = request.get_json()
#     # Check if user exists
#     if db.users.find_one({'username': data['username']}):
#         return jsonify({'message': 'Username already exists'}), 400
#     # Insert new user
#     db.users.insert_one(data)
#     return jsonify({'message': 'User created successfully'}), 201

# @app.route('/signin', methods=['POST'])
# def signin():
#     data = request.get_json()
#     user = db.users.find_one({'username': data['username'], 'password': data['password']})
#     if user:
#         return jsonify({'message': 'Login successful'}), 200
#     else:
#         return jsonify({'message': 'Invalid credentials'}), 401


# # @app.route('/')
# # def hello_world():
# #     print(os.path.dirname(__file__))
# #     return 'server started'
# # @app.route('/')
# # def serve_index():
# #     index_folder_path = os.path.join(os.path.dirname(__file__), 'C:\\Users\\shoai\\OneDrive\\Desktop\\Major_Project\\FrontEnd\\')
# #     return send_from_directory(index_folder_path, 'index.html')

# @app.route('/post', methods=['POST'])
# def handle_post():
#     # Check if the POST request contains files
#     print(request, "REQUEST")
#     if 'original_image' not in request.files not in request.files:
#         return jsonify({'error': 'No files found in the request'}), 400

#     original_image = request.files['original_image']
    

#     # Check if file is selected
#     if original_image.filename == '' :
#         return jsonify({'error': ' original  required'}), 400

#     # Check if files are allowed
#     if not allowed_file(original_image.filename) :
#         return jsonify({'error': 'Only image files are allowed'}), 400

#     # Save original image
#     original_image_filename = os.path.join(app.config['UPLOAD_FOLDER'], original_image.filename)
#     original_image.save(original_image_filename)

    
#     #image masking
#     image_path = original_image_filename
#    #image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
#     image = cv2.imread(image_path)
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#     _, mask = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)
#     kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
#     mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
# # Invert the image
#    # inverted_image = cv2.bitwise_not(image)

# # Create a binary mask for missing pixels
#    # missing_pixels_mask = np.where(inverted_image == 0, 255, 0).astype(np.uint8)
   

# # Save the masked image
#     masked_image_path = os.path.join(output_folder, 'masked_' + os.path.basename(image_path))
#    # cv2.imwrite(masked_image_path, missing_pixels_mask)
#     cv2.imwrite(masked_image_path, mask)
#     print("Masked image saved at:", masked_image_path)
    

#     result_image_filename = os.path.join(app.config['RESULT_FOLDER'], original_image.filename)

#     inpainting_face(original_image_filename,masked_image_path, result_image_filename )
    

    

  
#     # result_image_filename = os.path.join(os.path.dirname(__file__), result_image_filename)
#     # C:\Users\shoai\OneDrive\Desktop\Major_Project\image-inpainting\results
#     # print(result_image_filename)
#     # print
#     # result_image_filename = 'C:\Users\shoai\OneDrive\Desktop\Major_Project\image-inpainting\\' + result_image_filename
#     return jsonify({'result_image': result_image_filename})   
#     # return jsonify({'message': 'Images uploaded successfully'})


from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import cv2
import numpy as np
from skimage.metrics import structural_similarity as ssim
from pymongo import MongoClient
from inpainting_face import inpainting_face  # Assuming you have this function defined somewhere
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
RESULT_FOLDER = 'results'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER

output_folder = 'masked_images'
os.makedirs(output_folder, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

client = MongoClient('mongodb+srv://shoaibm2415:shoaibm2415@cluster0.x0hugws.mongodb.net/image-inpainting')
db = client['mydatabase']

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if db.users.find_one({'username': data['username']}):
        return jsonify({'message': 'Username already exists'}), 400
    db.users.insert_one(data)
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    user = db.users.find_one({'username': data['username'], 'password': data['password']})
    if user:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/post', methods=['POST'])
def handle_post():
    if 'original_image' not in request.files:
        return jsonify({'error': 'No files found in the request'}), 400

    original_image = request.files['original_image']

    if original_image.filename == '':
        return jsonify({'error': ' original  required'}), 400

    if not allowed_file(original_image.filename):
        return jsonify({'error': 'Only image files are allowed'}), 400

    original_image_filename = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(original_image.filename))
    original_image.save(original_image_filename)

    image_path = original_image_filename
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, mask = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

    masked_image_path = os.path.join(output_folder, 'masked_' + os.path.basename(image_path))
    cv2.imwrite(masked_image_path, mask)

    result_image_filename = os.path.join(app.config['RESULT_FOLDER'], original_image.filename)

    inpainting_face(original_image_filename, masked_image_path, result_image_filename)

    ssim_value = calculate_ssim(original_image_filename, result_image_filename)
    psnr_value, mse_value = calculate_psnr_mse(original_image_filename, result_image_filename)

    return jsonify({
        'result_image': result_image_filename,
        'ssim': float(ssim_value),
        'psnr': float(psnr_value),
        'mse': float(mse_value)
    })

def calculate_ssim(original_image, inpainted_image):
    original_img = cv2.imread(original_image, cv2.IMREAD_GRAYSCALE)
    inpainted_img = cv2.imread(inpainted_image, cv2.IMREAD_GRAYSCALE)
    ssim_value = ssim(original_img, inpainted_img)
    return ssim_value

def calculate_psnr_mse(original_image, inpainted_image):
    original_img = cv2.imread(original_image)
    inpainted_img = cv2.imread(inpainted_image)
    original_img = original_img.astype(np.float32)
    inpainted_img = inpainted_img.astype(np.float32)
    mse = np.mean(np.square(original_img - inpainted_img))
    psnr = cv2.PSNR(original_img, inpainted_img)
    return psnr, mse

if __name__ == "__main__":
    app.run(debug=True)
