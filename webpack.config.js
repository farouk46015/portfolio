'user strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
        app :'./js/app.js'  
    },
    output:{
        path : path.resolve(__dirname,'dist/'),
        filename : 'assets/js/bundle.js',
    },
    module:{
        rules :[
            {
                test :  /\.(sass|scss|css)$/,
                use : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:[{
                        loader :'css-loader',
                        options :{
                            minimize: true
                        }
                    },{
                        loader :'sass-loader'
                    }
                ]   
                })
            },
            {
                test : /\.(png|jpe?g|svg|gif)$/i,
                use :  [
                    {
                        loader : 'image-webpack-loader'
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name : '[name].[ext]',
                            outputPath :"./assets/img/",
                            useRelativePath :true,
                        }  
                    }
                ]
            }
        ]
    },plugins:[
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          }),
        new ExtractTextPlugin({
            filename: (getPath)=>{
                return getPath( 'assets/css/[name].min.css').replace('css/js', 'css');
            },
            allChunks: true
          })
          ,
          new HtmlWebpackPlugin({
              title : 'moufeed.me',
              minify:{
		        hash :true,
		        collapseWhitespace :true
		     },
              template : './index.html'
          }),
          new HtmlWebpackPlugin({
            title : 'moufeed.me/works',
            minify:{
              hash :true,
              collapseWhitespace :true
           },
            filename: 'works.html',
            template : './views/works.html'
        }),
            new HtmlWebpackPlugin({
            title : 'moufeed.me/work',
            minify:{
                hash :true,
                collapseWhitespace :true
            },
            filename: 'work.html',
            template : './views/work.html'
        }),
         
          new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['dist'] }
          }),
          new CopyWebpackPlugin([
            // {
            //     context: './views',
            //     from: '**/*',
            //     to: './'
            // },
            {
                context: './img',
                from: '**/*',
                to: './assets/img/'
            }
          ],
        {
            copyUnmodified: true
        })
    ]
};