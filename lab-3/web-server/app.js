const http = require("http");
const url = require("url");
const fs = require("fs");

const webServer = http.createServer();
webServer.on("connection", (connection) => {
  // console.log('some one trying to connect')
  getConnectionsCount();
});

webServer.on("request", async (req, res) => {
  const reqUrlParsed = url.parse(req.url, true);
  const reqUrl = reqUrlParsed.pathname;

  console.log("req ==========>");

  //read custom style sheet
  if (reqUrl == "/public/styles.css") {
    res.setHeader("Content-type", "text/css");
    res.write(fs.readFileSync("./public/styles.css"));
    res.end();
  }
  //read bootstrab
  if (reqUrl == "/public/bootstrap-5.0.0-beta1-dist/css/bootstrap.min.css") {
    res.setHeader("Content-type", "text/css");
    let file = "/public/bootstrap-5.0.0-beta1-dist/css/bootstrap.min.css";
    res.write(fs.readFileSync("./public/bootstrap-5.0.0-beta1-dist/css/bootstrap.min.css"));
    res.end();
    // readPages(res,file,"text/css")
  }
  if (req.method == "GET") {
    if (reqUrl == "/") {
      fs.promises
        .readFile("./home.html", "utf8")
        .then((contents) => {
          renderResponse(res, 200, "text/html", contents);
        })
        .catch((err) => {
          renderResponse(
            res,
            500,
            "application/json",
            JSON.stringify({
              error: "no such file ",
            })
          );
          return;
        });
    }
    if (reqUrl == "/login") {
      var html = fs.readFileSync("./login.html", "utf8");
      renderResponse(res, 200, "text/html", html);
    }
  } else if (req.method == "POST") {
    if (reqUrl.includes("/api")) {
      switch (reqUrl) {
        case "/api/login":
          const formData = await getBody(req);
          if (!dataValidation(formData)) {
            renderResponse(res, 400, "application/json", JSON.stringify({ error: "pls provid an email & pass " }));
          }
          let obj = fs.readFileSync("./data.json", (err, data) => {
            if (err) throw err;
          });
          obj = JSON.parse(obj);
          let checkCredintials = obj.filter((ele) => ele.user == formData.user && ele.passWord == formData.pass);

          if (checkCredintials.length <= 0) {
            renderResponse(
              res,
              404,
              "application/json",
              JSON.stringify({
                error: "user not found",
              })
            );
          } else {
            checkCredintials = checkCredintials[0];
            renderResponse(res, 200, "application/json", JSON.stringify(checkCredintials));
          }
          break;
        case "/api/sign-up":
          const submitData = await getBody(req);
          if (!dataValidation(submitData)) {
            renderResponse(res, 400, "application/json", JSON.stringify({ error: "pls provid an email & pass " }));
          }
          obj = fs.readFileSync("./data.json", (err, data) => {
            if (err) throw err;
          });
          obj = JSON.parse(obj);
          checkCredintials = obj.filter((ele) => ele.user == formData.user && ele.passWord == formData.pass);

          if (checkCredintials.length <= 0) {
            renderResponse(res, 200, "application/json", JSON.stringify({ error: "user created" }));
          } else {
            renderResponse(res, 400, "application/json", JSON.stringify({ error: "user alredy exists " }));
          }
          break;

        default:
          renderResponse(res, 404, "application/json", JSON.stringify({ error: "url not found " }));
          break;
      }
    } else if (reqUrl == "/login") {
      const formData = await getBody(req);

      let obj = fs.readFileSync("./data.json", (err, data) => {
        if (err) throw err;
      });
      obj = JSON.parse(obj);
      let checkCredintials = obj.filter((ele) => ele.user == formData.user && ele.passWord == formData.pass);

      if (checkCredintials.length <= 0) {
        let html = fs.readFileSync("./profile.html", "utf8");
        html = html.replace("{user}", "this user not found");

        renderResponse(res, 404, "text/html", html);
      } else {
        checkCredintials = checkCredintials[0];
        let html = fs.readFileSync("./profile.html", "utf8");
        html = html.replace("{user}", JSON.stringify(checkCredintials.user));

        renderResponse(res, 200, "text/html", html);
      }
    }else{
      renderResponse(res, 404, "application/json", JSON.stringify({ error: "url not found " }));
    }
  }else{
    renderResponse(res, 405, "application/json", JSON.stringify({ error: "method not allowed " }));
  }
});
function getConnectionsCount() {
  webServer.getConnections((err, count) => {
    // console.log(`we've got ${count} connections`)
  });
}
// ==================================================
//      HELPER SECTION
// =====================================================
const dataValidation = (formData) => {
  if (!formData.user || !formData.pass) {
    return false;
  }
  return true;
};
const readPages = (response, file, type) => {
  let data =
    (fs.readFileSync(file),
    (err, data) => {
      if (err) {
        renderResponse(res, 500, "application/json", JSON.stringify({ error: "no such file " }));
        return;
      }
      renderResponse(response, 200, type, data);
    });
};
const renderResponse = (response, code, type, data) => {
  response.writeHead(code, { "content-type": `${type}` });
  response.write(data);
  response.end();
};
const getBody = async (req) => {
  let data = "";
  let buffers = [];
  let params = {};
  let formData = {};
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  data = Buffer.concat(buffers).toString();

  if (req.headers["content-type"] === "application/json") {
    formData = JSON.parse(data);
  } else if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
    params = new URLSearchParams(data); //transfer it to object
    // URLSearchParams { data as key value pair }
    params.forEach((value, key) => {
      formData[key] = value;
    });
  }

  return formData;
};
webServer.listen(4000, () => {
  console.log("server is starting ");
});
