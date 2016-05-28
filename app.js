var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var auth = require('./auth');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

// 设置渲染引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.pretty = true;

// 设置图标，日志，paser
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 设置 session
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'songrn'
}));

//app.use('/', routes);
//app.use('/users', users);

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

app.get('/', function(req, res){
  res.redirect('/login');
});

app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/login', function(req, res){
  auth.auth(req.body.username, req.body.password, function(user){
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        res.json({status:1});
      });
    } else {
      res.json({status:-1});
    }
  });
});

var roleMap = {
  'admin' : '管理员',
  'user'  : '普通用户'
};

app.get('/index', restrict, function(req, res) {
  res.render('index', {   
    username:req.session.user.username,
    role:roleMap[req.session.user.role]});
});

app.get('/main', restrict, function(req, res) {
  res.render('main');
});

app.get('/video', restrict, function(req, res) {
  console.log(req.query.id);
  res.render('video', {
    id:req.query.id});
});

app.get('/network', restrict, function(req, res) {
  res.render('network', {
    id:req.query.id});
});

app.get('/topn', restrict, function(req, res){
  res.render('topn');
});

app.get('/account', restrict, function(req, res){
  console.log(req.session.user.role);
  if (req.session.user.role == "admin") {
    var users = [];
    auth.listUsers(users, function(){
      res.render('account', {users});
    });
  } else {
    res.redirect('back');
  }
});

app.post('/account', restrict, function(req, res){
  auth.updateUserDatas(req.body, function(status){
      res.json({status:status});
  });
});

// 获取随机数据
function getRandomData(data, fined, start_time, end_time)
{
    var interval = 0;
    var distance = end_time - start_time;
    if (fined == 'hour') {
        interval = 3600 * 1000;     
    } else if (fined == 'day') {
        interval = 3600 * 1000 * 24; 
    } else if (fined == 'month') {
        interval = 3600 * 1000 * 24 * 30; 
    };
    var times = (end_time - start_time) / interval;
    for (var i = 0; i <= times; i++) {
        var now = start_time + interval * i;
        data[now] = {};
        data[now]['success-rate'] = Math.random() * 5 + 8;
        data[now]['buffer-delay'] = Math.random() * 5 + 8;
        data[now]['break-rate'] = Math.random() * 5 + 8;
        data[now]['break-time'] = Math.random() * 5 + 8;
        data[now]['break-percent'] = Math.random() * 5 + 8;
        data[now]['download-speed'] = Math.random() * 5 + 8;
    }
};

// 测试
app.get('/do', restrict, function(req, res){
  var start_time = parseInt(req.query.time_from);
  var end_time = parseInt(req.query.time_end);
  var fined = req.query.timer_period;
  var retJson = {retcode:0, data:{}};
  getRandomData(retJson.data, fined, start_time, end_time);
  console.log(retJson);
  res.jsonp(retJson);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
