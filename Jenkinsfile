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
                bash 'npm list'
            }
        }

       

        // stage('Start Frontend') {
        //     steps {
        //         sh 'npm run dev'
        //     }
        // }

        // stage('Deploy') {
        //     when {
        //         branch 'main'
        //     }
        //     steps {
        //         echo 'Deploy to production server...'
        //         // Здесь вы можете добавить команды для деплоя
        //     }
        // }
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
