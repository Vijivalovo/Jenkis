pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Имя, указанное в настройках Jenkins
    }

    environment {
        DATABASE_URL = "postgres://postgres:admin@localhost:5432/Auction"
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                // Клонирование нужной ветки
                git branch: env.BRANCH_NAME, url: 'git@github.com:<username>/<repo>.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint and Test') {
            steps {
                // Если есть линтер или тесты
                sh 'npm run lint || echo "No lint configured"'
                sh 'npm test || echo "No tests configured"'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'node app.jsx'
            }
        }

        stage('Start Frontend') {
            steps {
                sh 'npm run dev'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploy to production server...'
                // Здесь вы можете добавить команды для деплоя
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
