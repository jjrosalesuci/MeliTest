 
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var http       = require('http');

// configure app
app.use(morgan('dev')); // log requests to the console
// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port     = process.env.PORT || 30000; // set our port
var router   = express.Router();

router.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our aspi!' });	
});

router.route('/search/:query').get(function(req, res) {
    var meliEndPoint = `https://api.mercadolibre.com/sites/MLA/search?q=${req.params.query}&limit=4`;
    var request = require('request');
    request(meliEndPoint, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        
         var obj = JSON.parse(body);
         var products = obj.results;
         var coletion = [];
         var maxAvaQuantity = 0;
         var maxCategoryId  = "";

         for(var i= 0; i< products.length;i++){
         
            if(products[i].available_quantity>maxAvaQuantity){
              maxCategoryId = products[i].category_id;
              maxAvaQuantity = products[i].available_quantity;
            }
                     
            var product = {           
              author: {
                name: "Juan",
                lastname: "Rosales"
              },
              item: {
                id: products[i].id,
                title: products[i].title,
                price: {
                  currency: products[i].currency_id,
                  amount: products[i].price,
                  decimals: 0,
                },
                picture:  products[i].thumbnail,
                condition:  products[i].condition,
                free_shipping:  products[i].shipping.free_shipping,
                sold_quantity: products[i].sold_quantity,
                description: ""
              }
            };
            coletion.push(product);
         }

         //Load Data from category
         
          var response = {
            data:coletion,
            category:null
         }


          var meliEndPointCategory = ` https://api.mercadolibre.com/categories/${maxCategoryId}`;
          request(meliEndPointCategory, function (errorc, responsec, bodyc) {
            if (!errorc && responsec.statusCode == 200) {            
                var obj = JSON.parse(bodyc);
                response.category = obj;
                res.json(response);   
            }else{
                res.json(response);  
            }
          }); 
        
            
      }
    });     
});

router.route('/item/:id')
	.get(function(req, res) {
		//req.params.id
     var meliEndPoint1 = `https://api.mercadolibre.com/items/${req.params.id}`;
     var meliEndPoint2 = `https://api.mercadolibre.com/items/${req.params.id}/description`;
    

     var request = require('request');

      request(meliEndPoint1, function (error, response, body) {
         if (!error && response.statusCode == 200) {            
            var obj = JSON.parse(body);
            //res.json(obj); 
            //category_id
            var result = {        
                    'author': {
                      'name': 'Juan',
                      'lastname': 'Rosales'
                    },
                    'item': {
                      'id':obj.id,
                      "title": obj.title,
                      'price': {
                        'currency': obj.currency_id,
                        'amount': obj.price,
                        'decimals': 0,
                      },
                      'picture': obj.thumbnail,
                      'condition':  obj.condition == 'new' ? "Nuevo" : "Usado",
                      'free_shipping': obj.shipping.free_shipping,
                      'sold_quantity': obj.sold_quantity,
                      'description': null
                    }
            }
            
            request(meliEndPoint2, function (error2, response2, body2) {
                if (!error2 && response2.statusCode == 200) {            
                    var obj2 = JSON.parse(body2);
                    result.item.description=obj2.plain_text;


                    var meliEndPointCategory = ` https://api.mercadolibre.com/categories/${obj.category_id}`;
                    request(meliEndPointCategory, function (errorc, responsec, bodyc) {
                      if (!errorc && responsec.statusCode == 200) {            
                          var objc = JSON.parse(bodyc);
                          result.item.category = objc;
                          res.json(result);  
                      }else{
                          res.json(result);  
                      }
                    }); 
                  }
              }); 
          }
      });  
	})
	
app.use('/api', router);
app.listen(port);
console.log('Servidor inicado ' + port);
