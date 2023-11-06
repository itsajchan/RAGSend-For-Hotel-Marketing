from setuptools import find_packages, setup

setup(
    name="hotel_rag_marketing",
    packages=find_packages(exclude=["hotel_rag_marketing_tests"]),
    install_requires=[
        "dagster",
        "dagster-cloud"
    ],
    extras_require={"dev": ["dagster-webserver", "pytest"]},
)
