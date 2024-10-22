FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

WORKDIR /app

COPY src/requirements.txt ./

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY src/app /app

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]


