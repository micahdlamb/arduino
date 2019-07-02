char* html = "<!doctype html>\n"
"<html lang=\"en\">\n"
"  <head>\n"
"\t<!-- Required meta tags -->\n"
"\t<meta charset=\"utf-8\">\n"
"\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n"
"\n"
"\t<!-- Bootstrap CSS -->\n"
"\t<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\" integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">\n"
"\t<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.8.2/css/all.css\" integrity=\"sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay\" crossorigin=\"anonymous\">\n"
"\n"
"\t<title>Motor Control</title>\n"
"\t\n"
"\t<style>\n"
"\t\t.buttons {\n"
"\t\t\tmargin: -3px;\n"
"\t\t}\n"
"\t\t.buttons > div {\n"
"\t\t\tpadding: 3px;\n"
"\t\t}\n"
"\t\t.buttons .btn {\n"
"\t\t\tfont-size: 3rem;\n"
"\t\t\twidth: 100%;\n"
"\t\t}\n"
"\t\t.buttons .btn:active i {\n"
"\t\t\tcolor: #F09;\n"
"\t\t\tanimation: glow 1s ease-in-out infinite alternate;\n"
"\t\t}\n"
"\n"
"\t\t@-webkit-keyframes glow {\n"
"\t\t\tfrom {\n"
"\t\t\t\ttext-shadow: 0 0 10px #F09;\n"
"\t\t\t}\n"
"\t\t\tto {\n"
"\t\t\t\ttext-shadow: 0 0 20px #F09;\n"
"\t\t\t}\n"
"\t\t}\n"
"\n"
"\t</style>\n"
"  </head>\n"
"  <body>\n"
"\t<div class=\"container\">\n"
"\t\t<h1>Pin Control</h1>\n"
"\t\t<div class=\"buttons row\">\n"
"\t\t\t<div class=\"col-lg-2 col-md-4\">\n"
"\t\t\t\t<button type=\"button\" pin=\"1\" class=\"btn btn-dark\">\n"
"\t\t\t\t\tA1 <i class=\"fas fa-lightbulb\"></i>\n"
"\t\t\t\t</button>\n"
"\t\t\t</div>\n"
"\t\t\t<div class=\"col-lg-2 col-md-4\">\n"
"\t\t\t\t<button type=\"button\" pin=\"2\" class=\"btn btn-dark\">\n"
"\t\t\t\t\tA2 <i class=\"fas fa-lightbulb\"></i>\n"
"\t\t\t\t</button>\n"
"\t\t\t</div>\n"
"\t\t\t<div class=\"col-lg-2 col-md-4\">\n"
"\t\t\t\t<button type=\"button\" pin=\"3\" class=\"btn btn-dark\">\n"
"\t\t\t\t\tA3 <i class=\"fas fa-lightbulb\"></i>\n"
"\t\t\t\t</button>\n"
"\t\t\t</div>\n"
"\t\t\t<div class=\"col-lg-2 col-md-4\">\n"
"\t\t\t\t<button type=\"button\" pin=\"4\" class=\"btn btn-dark\">\n"
"\t\t\t\t\tA4 <i class=\"fas fa-lightbulb\"></i>\n"
"\t\t\t\t</button>\n"
"\t\t\t</div>\n"
"\t\t\t<div class=\"col-lg-2 col-md-4\">\n"
"\t\t\t\t<button type=\"button\" pin=\"5\" class=\"btn btn-dark\">\n"
"\t\t\t\t\tA5 <i class=\"fas fa-lightbulb\"></i>\n"
"\t\t\t\t</button>\n"
"\t\t\t</div>\n"
"\t\t\t<div class=\"col-lg-2 col-md-4\">\n"
"\t\t\t\t<button type=\"button\" pin=\"6\" class=\"btn btn-dark\">\n"
"\t\t\t\t\tA6 <i class=\"fas fa-lightbulb\"></i>\n"
"\t\t\t\t</button>\n"
"\t\t\t</div>\n"
"\t\t</div>\n"
"\t</div>\n"
"\n"
"\t<!-- Optional JavaScript -->\n"
"\t<!-- jQuery first, then Popper.js, then Bootstrap JS -->\n"
"\t<script src=\"https://code.jquery.com/jquery-3.3.1.slim.min.js\" integrity=\"sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo\" crossorigin=\"anonymous\"></script>\n"
"\t<script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\" integrity=\"sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1\" crossorigin=\"anonymous\"></script>\n"
"\t<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\" integrity=\"sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM\" crossorigin=\"anonymous\"></script>\n"
"\t<script>\n"
"\t\tdocument.querySelectorAll(\".buttons .btn\").forEach(btn => {\n"
"\t\t\tlet pin = btn.getAttribute(\"pin\")\n"
"\t\t\tlet turnOn  = () => fetch(`http://192.168.1.230/${pin}/1`, {method: 'POST'})\n"
"\t\t\tlet turnOff = () => fetch(`http://192.168.1.230/${pin}/0`, {method: 'POST'})\n"
"\n"
"\t\t\tbtn.addEventListener(\"mousedown\", turnOn)\n"
"\t\t\tbtn.addEventListener(\"touchstart\", turnOn)\n"
"\n"
"\t\t\tbtn.addEventListener(\"mouseup\", turnOff)\n"
"\t\t\tbtn.addEventListener(\"touchend\", turnOff)\n"
"\t\t})\n"
"\t</script>\n"
"  </body>\n"
"</html>";