const shortid = require('shortid')
const URL = require('../models/url');


async function  handleGenerateUrl(req,res){
    const shortId = shortid(8);
    if(!req.body.url)return res.status(400).json({error:'url is required'});
    await URL.create({
        shortId:shortId,
        redirectUrl:req.body.url,
        visitHistory:[],
        createdBy:req.user._id
    })
    return res.render("home",{
        id:shortId
    })
}
async function  handleGetAnalytics(req,res){
    const shortId= req.params.shortId;
    const result = await URL.findOne({shortId:shortId});
    return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}

module.exports ={
    handleGenerateUrl,handleGetAnalytics
}