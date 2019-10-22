module.exports.cron = {
    croning: false,

    setCroning: function (state) {
        this.croning = state;
    },

    assetTransferCron: function () {
        while(this.croning) 
        {
            User.find
        }
    }

}