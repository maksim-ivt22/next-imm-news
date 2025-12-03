#!/bin/sh

echo "Applying migrations..."
python manage.py migrate --noinput

echo "Creating superuser if not exists..."
python manage.py shell <<EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', '$DJANGO_SUPERUSER_PASSWORD')
EOF

echo "Starting Gunicorn..."
gunicorn config.wsgi:application --bind 0.0.0.0:8000
