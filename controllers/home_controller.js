module.exports.home=function(req,res)
{
  //  return res.end('<h1> exprees is up for codeial</h1>');
    res.render('home',{
        title:"home"
    });
}