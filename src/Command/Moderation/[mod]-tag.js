const { MessageEmbed } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {

    let yanlis = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTitle("İşte Sunucumuzun Tag'ı").setTimestamp().setFooter("Roots ❤️")
    return message.channel.send(yanlis.setDescription(`𝓡`))

};

module.exports.config = { 
    name: 'tag',
    aliases: ['tag']
};