const { Schema, model }= require('mongoose');

const cardSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  image:{
    type: String
  },
  cardtype:{
    type:String
  },
  description:{
    type: String
  },
  battlep:{
    type: Number
  },
  defensp:{
    type: Number
  },
},{
  timestamps: true
});

module.exports = model('card', cardSchema, 'cards');