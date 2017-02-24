//首页
FlowRouter.route('/', {
    action: function(params, queryParams) {
        FlowLayout.render("index");
    },
    triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
//基本信息
FlowRouter.route('/basic', {
    action: function(params, queryParams) {
        FlowLayout.render("basic");
    }
});
//客栈首页
FlowRouter.route('/inn', {
    action: function(params, queryParams) {
        FlowLayout.render("inn");
    }
});
//图片管理
FlowRouter.route('/picture', {
    action: function(params, queryParams) {
        FlowLayout.render("picture");
    }
});
//客房管理
FlowRouter.route('/room', {
    action: function(params, queryParams) {
        FlowLayout.render("room");
    }
});
//客房添加
FlowRouter.route('/room_add', {
    action: function(params, queryParams) {
        FlowLayout.render("room_add");
    }
});
//订单管理
FlowRouter.route('/order', {
    action: function(params, queryParams) {
        FlowLayout.render("order");
    }
});
//客栈账户
FlowRouter.route('/account', {
    action: function(params, queryParams) {
        FlowLayout.render("account");
    }
});
