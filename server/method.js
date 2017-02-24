Meteor.methods({    
	saveMrecord: function(args) {
        var uid = args.userid;
        var avatar = args.avatar;
        var prefix = avatar.substr(0, avatar.indexOf("base64") + 7);
        var ext = "jpg";
        var mine = "image/jpeg";
        if (prefix.indexOf("png") > 0) {
            ext = "png";
            mine = "image/png";
        } else if (prefix.indexOf("gif") > 0) {
            ext = "gif";
            mine = "image/gif";
        }

        var name = "avatar/" + parseInt(Math.random() * 10000000000) + "." + ext;

        var data = avatar.replace(/^data:image\/\w+;base64,/, "");
        var base64 = new Buffer(data, "base64");




        this.unblock();
        var avatarData = "http://fami-crm.oss-cn-beijing.aliyuncs.com/" + name;
        oss.putObject({
                Bucket: 'fami-crm',
                Key: name, // 注意, Key 的值不能以 / 开头, 否则会返回错误.
                Body: base64,
                AccessControlAllowOrigin: '*',
                ContentType: mine,
                CacheControl: 'max-age', // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
                ContentDisposition: '', // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.5.1
                ContentEncoding: 'utf-8', // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11
                ServerSideEncryption: 'AES256',
                Expires: null // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.21
            },
            // Meteor.bindEnvironment(function(err, data) {
            // 	console.log(err);
            // 	args.avatar = avatarData;
            //     Basics.insert({
            //         uid:facc.user()._id,
            //     	createAt:new Date(),
            //     	avatar:avatarData,
            //     	name:args.name,
            //         bespeak_tel:args.bespeak_tel,
            //         weixin:args.weixin,
            //         region:args.region,
            //         address:args.address,
            //         introduce:args.introduce,
            //     });
            // }, function(e) {
            //     throw e;
            // })
            Meteor.bindEnvironment(function(err, data) {
                Basics.update({userid:uid}, {
                    $set: {
                        "name": args.name,
                        "bespeak_tel": args.bespeak_tel,
                        "weixin": args.weixin,
                        "region": args.region,
                        "address": args.address,
                        "introduce": args.introduce,
                        createAt:new Date(),
                        "avatar": avatarData,
                    }
                });
            }, function(e) {
                throw e;
            })
        );


        return "SUCCESS";
    },

});