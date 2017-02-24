Meteor.publish("basic", function(uid) {
    return Basics.find({
        userid: uid
    }, {
        sort: {
            createAt: -1
        }
    });
});