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
        dir('backend') {
            bat 'npm -v'
            bat 'npm cache clean --force'
            bat 'npm ci'
            bat 'npm install supertest --save-dev'
            //bat 'npm list supertest'
        }
    }
}

       stage('Lint and Test') {
            steps {
                 dir('backend') {
                    bat 'npm ci --include=dev'
                    bat 'npm test'
                    }
             }
         }

         stage('Build Backend') {
             steps {
                 dir('backend') {
                    bat 'node app.jsx'
                }
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
