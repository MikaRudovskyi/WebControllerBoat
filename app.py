from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# Указываем путь к корню проекта
project_root = os.path.abspath(os.path.dirname(__file__))

@app.route('/')
def index():
    return send_from_directory(project_root, 'index.html')

# Обрабатываем запросы на статические файлы
@app.route('/<filename>')
def static_files(filename):
    return send_from_directory(project_root, filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
