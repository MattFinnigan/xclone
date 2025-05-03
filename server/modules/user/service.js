const User = require('./model')
const Post = require('../post/model')
const { Op } = require('sequelize')

exports.createUser = (userData) => {
  const randHandle = `@${userData.name.replace(/ /g, '')}${Math.floor(Math.random() * (99999999 - 1000000 + 1)) + 10000000}`
  return User.create({ ...userData, handle: randHandle })
}

exports.getUserById = (id) => {
  return User.findByPk(id)
}

exports.getUserByEmail = (email) => {
  return User.findOne({ where: { email } })
}

exports.getProfile = (id) => {
  return User.findOne({
    where: { id },
    include: [
      {
        model: Post,
        where: { comment_post_id: null },
        as: 'posts',
        include: [
          {
            model: Post,
            as: 'repost',
            order: [['createdAt', 'DESC']],
            include: [
              {
                model: User,
                attributes: ['name', 'avatar', 'handle'],
                as: 'user',
              },
              {
                model: Post,
                as: 'comments',
                separate: true,
                order: [['createdAt', 'DESC']],
                include: [
                  {
                    model: User,
                    attributes: ['name', 'avatar', 'handle'],
                    as: 'user',
                  }
                ]
              }
            ],
          },
          {
            model: Post,
            as: 'comments',
            separate: true,
            order: [['createdAt', 'DESC']],
            include: [
              {
                model: User,
                attributes: ['name', 'avatar', 'handle'],
                as: 'user',
              },
              {
                model: Post,
                as: 'comments',
                separate: true,
                order: [['createdAt', 'DESC']],
                include: [
                  {
                    model: User,
                    attributes: ['name', 'avatar', 'handle'],
                    as: 'user',
                  }
                ]
              }
            ],
          },
          {
            model: User,
            attributes: ['name', 'avatar', 'handle'],
            as: 'user'
          }
        ]
      },
      {
        model: Post,
        where: {
          reposted_post_id: null,
          comment_post_id: {
            [Op.not]: null
          }
        },
        as: 'comments',
        separate: true,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: User,
            attributes: ['name', 'avatar', 'handle'],
            as: 'user',
          },
          {
            model: Post,
            as: 'comments',
            separate: true,
            order: [['createdAt', 'DESC']],
            include: [
              {
                model: User,
                attributes: ['name', 'avatar', 'handle'],
                as: 'user',
              }
            ]
          }
        ],
      }
    ]
  })
}

User.associate = (models) => {
  User.hasMany(models.Post, {
    foreignKey: 'user_id',
    as: 'posts'
  })
  User.hasMany(models.Post, {
    foreignKey: 'user_id',
    as: 'comments'
  })
}