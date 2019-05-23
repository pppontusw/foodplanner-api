FROM python:3.7-alpine as build

COPY requirements.txt requirements.txt
RUN python -m venv /venv
RUN apk add --update gcc postgresql-dev python3-dev musl-dev
RUN /venv/bin/pip install -r requirements.txt
RUN /venv/bin/pip install gunicorn
RUN /venv/bin/pip install psycopg2

FROM python:3.7-alpine

COPY --from=build /venv /venv

RUN apk --no-cache add libpq

RUN adduser -D foodlist

WORKDIR /home/foodlist

COPY alembic alembic
COPY app app
COPY alembic.ini alembic.ini
COPY foodlist.py config.py boot.sh ./
RUN chmod +x boot.sh

ENV FLASK_APP foodlist.py

RUN chown -R foodlist:foodlist ./
USER foodlist

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]