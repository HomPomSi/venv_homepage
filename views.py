#! /usr/bin/python3

from flask import Blueprint, render_template, redirect, jsonify, url_for


views = Blueprint(__name__, "views")

@views.route("/")
def main():
    return redirect(url_for("views.home"))


@views.route("/home")
def home():
    return render_template("index.html")

@views.route("/canvas")
def canvas():
    return render_template("canvas.html")

@views.route("/about")
def about():
    return render_template("about.html")

@views.route("/contact")
def contact():
    return render_template("contact.html")

@views.route("/canvas/langtonsant")
def langtonsant():
    return render_template("canvas/langtonsant.html")

if __name__ == "__main__":
    print("useless call")
