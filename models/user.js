const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  gitId: {
    type: String,
    required: true
  },
  nodeId: {
    type: Number,
    required: true
  },
  imgUrl: {
    type: String,
  },
  totalScore: {
    type: Number,
    default: 0
  },
  problemHistory: {
    type: Array,
    default: []
  },
  gameHistory: {
    type: Array,
    default: []
  }
});

// 모든 유저 목록
UserSchema.statics.findAll = function () {
  return this.find()
};

// 기존 유저 토큰 업데이트
UserSchema.statics.isExist = function (nodeId, token) {
  console.log('nodeId:', nodeId);
  return this.findOneAndUpdate({nodeId: nodeId}, {token: token}, {new: true});
}

// 신규 유저 등록
UserSchema.statics.createUser = function (info) {
	return this.create(info);
}

// 게임 끝난 후 업데이트
// user = await User.updateUserInfo(user.nodeId, {score: 4, problemId: 8, gameId: 8})
UserSchema.statics.updateUserInfo = async function (nodeId, info) {
  const user = await this.findOne({nodeId: nodeId});
  return await this.findOneAndUpdate(
    {nodeId: nodeId},
    {
      totalScore: user.totalScore + info['score'],
      $push: {
        problemHistory: info['problemId'],
        gameHistory: info['gameId']
      }
    },
    {new: true}
  )
}

module.exports = mongoose.model('User', UserSchema);