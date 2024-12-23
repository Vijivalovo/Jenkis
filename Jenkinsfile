pipeline {
    agent any

    tools {
        nodejs 'NodeJs' // Имя, указанное в настройках Jenkins
    }

    environment {
        DATABASE_URL = "postgres://postgres:admin@localhost:5432/Auction"
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout123') {
            steps {
                // Клонирование нужной ветки
                git branch: 'main', url: 'https://github.com/Vijivalovo/Jenkis.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'cd .\backend\ ; npm list'
            }
        }

       

       stage('Lint and Test') {
            steps {
                 bat 'npm test'
             }
         }

         stage('Build Backend') {
             steps {
                 bat 'node app.jsx'
             }
         }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
