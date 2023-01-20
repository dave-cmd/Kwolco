import pandas as pd
import sys

day = sys.argv[1]

print(f"Pipeline ran successfully for day  = {day} ...")


# docker run -it \
#     -e POSTGRES_USER="root" \
#     -e POSTGRES_PASSWORD="root" \
#     -e POSTGRES_DB="jumia" \
#     -v $(pwd)/jumia_postgres_data:/var/lib/postgresql/data \
#     -p 5433:5432 \
#     postgres:13


# docker run -it \
#     -e PGADMIN_DEFAULT_EMAIL="admin@admin.com" \
#     -e PGADMIN_DEFAULT_PASSWORD="root" \
#     -p 8080:80 \
#     dpage/pgadmin4
