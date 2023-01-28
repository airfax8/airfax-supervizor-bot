const { MessageEmbed } = require('discord.js');;
const db = require('quick.db');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');

module.exports.beta = async(client, message, args) => {
    let yanlis = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('RED')

    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let taglıalım = await db.fetch(`taglıalım.${message.guild.id}`)
    if(taglıalım === true){
        if(!uye.user.username.includes(Main.Tag) && !uye.roles.cache.has(config.Roller.VIP) && !uye.roles.cache.has(config.Roller.Booster)) return message.channel.send(yanlis.setDescription(`Sunucumuza şuan taglı alımdadır. Kişinin kayıt olabilmesi için 3 seçenek vardır ; \n 1- Sunucumuzun tagını alabilir. \n 2- Sunucuma boost basabilir. \n 3- Vip Rolü verilebilir.`)).then(x => x.delete({timeout: 5000}));
    }
    let Name = args[1]
    let Age = args[2]
    if(!uye) return message.channel.send(yanlis.setDescription('Bir kullanıcı belirtmelisin. <@üye/ID>'))
    if(!Name || !Age ) return message.channel.send(yanlis.setDescription(`Yanlış kullanım. ${Main.Prefix}e <@üye/ID> <İsim> <Yaş>`))
    let cpuan = db.get(`cezapuan.${uye.id}.${message.guild.id}`); 
    if(uye.id === message.author.id) return message.channel.send(yanlis.setDescription('Kendinizi kayıt edemezsiniz.'))
    if(uye.id === message.guild.ownerID ) return message.channel.send(yanlis.setDescription('Sunucu sahibini kayıt edemezsin.'))
    if(uye.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(yanlis.setDescription('Belirttiğiniz kullanıcı sizden Üst veya Aynı konumda bulunuyor.'))

    const İsim = `𝓡 ${Name} | ${Age}`

    db.add(`yetkili.${message.author.id}.kadın`, 1)
    db.add(`yetkili.${message.author.id}.toplam`, 1)
    let reg = db.fetch(`yetkili.${message.author.id}.toplam`)

    let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let kayıttarihi = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    moment.locale("tr")

    await uye.setNickname(`${İsim}`)
    await uye.roles.add(config.Register.k1)
    await uye.roles.add(config.Register.k2)
    await uye.roles.remove(config.Register.unreg)

    message.channel.send(new MessageEmbed().setColor('#ffb0b0').setAuthor(message.author.username, message.author.avatarURL({ dynamic: true})).setDescription(`${uye} Adlı kişi ${message.author} tarafından <@&${config.Register.k1}> Rolü verilerek kayıt edildi. \n  Kişinin yeni ismi: \`${İsim}\``))
    client.channels.cache.get(config.Log.Sohbet).send(`${uye}, Aramıza Katıldı.`)
    client.channels.cache.get(config.Log.RegisterLog).send(new MessageEmbed().setAuthor(message.member.nickname, message.author.avatarURL()).setColor('#ffb0b0').setTitle("KAYIT [KADIN]").setDescription(`• Yetkili: ${message.author} (\`${message.author.id}\`) \n • Kullanıcı: ${uye}(\`${uye.id}\`) \n • Verilen Roller: <@&${config.Register.k1}> \n • Tarih: \`${kayıttarihi}\``))


    db.push(`isim.${uye.id}`, {
        userID: uye.id,
        isimleri: İsim,
        role: `<@&${config.Register.k1}>`,
        teyitciid: message.author.id,
        teyitcisim: message.author.username
    })
};

module.exports.config = { 
    name: 'kadın',
    aliases: ['k','woman']
};