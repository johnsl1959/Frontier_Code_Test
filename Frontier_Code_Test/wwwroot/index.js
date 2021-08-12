/*Three different Vue objects were used with almost identical code to populate the different lists.
 <TODO> - find a way to get rid of code redundancy, possibly using Vue Components.*/

var activeAccounts = new Vue({
    el: '#activeAccounts',

    data: {
        accounts: []
    },

    created: function () {
        this.fetchAccounts();
    },

    methods: {
        fetchAccounts: function () {
            var accs = new Array();

            fetch('https://frontiercodingtests.azurewebsites.net/api/accounts/getall')
                .then(response => {

                    //Check response status code
                    //<TODO> - implement error handling
                    if (response.status == 200) {
                        return response.json();
                    }

                    else {
                        accs = new Array();
                    }
                })
                .then(response => {
                    accs = response;

                    //Step through the accounts and format the phone numbers, dates, and amounts due
                    //<TODO> - find a better way to format these fields, possibly using CSS
                    accs.forEach(acc => {
                        var str = '';

                        str = acc.PhoneNumber;
                        acc.PhoneNumber = '(' + str.substr(0, 3) + ')-' + str.substr(3, 3) + '-' + str.substr(6);
                        acc.PaymentDueDate = new Date(acc.PaymentDueDate).toLocaleDateString();

                        if (acc.AmountDue == 0) {
                            acc.AmountDue = '$00.00';
                        }

                        else {
                            acc.AmountDue = '$' + acc.AmountDue;
                        }
                    });
                    //Filter the accounts and return the accouns with the specified status id
                    this.accounts = accs.filter(acc => acc.AccountStatusId == 0);
                });
       }
    }
});

var overdueAccounts = new Vue({
    el: '#overdueAccounts',

    data: {
        accounts: []
    },

    created: function () {
        this.fetchAccounts();
    },

    methods: {
        fetchAccounts: function () {
            var accs = new Array();

            fetch('https://frontiercodingtests.azurewebsites.net/api/accounts/getall')
                .then(response => {

                    if (response.status == 200) {
                        return response.json();
                    }

                    else {
                        accs = new Array();
                    }
                })
                .then(response => {
                    accs = response;

                    accs.forEach(acc => {
                        var str = '';

                        str = acc.PhoneNumber;
                        acc.PhoneNumber = '(' + str.substr(0, 3) + ')-' + str.substr(3, 3) + '-' + str.substr(6);
                        acc.PaymentDueDate = new Date(acc.PaymentDueDate).toLocaleDateString();

                        if (acc.AmountDue == 0) {
                            acc.AmountDue = '$00.00';
                        }

                        else {
                            acc.AmountDue = '$' + acc.AmountDue;
                        }
                    });
                    this.accounts = accs.filter(acc => acc.AccountStatusId == 2);
                });
        }
    }
});

var inactiveAccounts = new Vue({
    el: '#inactiveAccounts',

    data: {
        accounts: []
    },

    created: function () {
        this.fetchAccounts();
    },

    methods: {
        fetchAccounts: function () {
            var accs = new Array();

            fetch('https://frontiercodingtests.azurewebsites.net/api/accounts/getall')
                .then(response => {

                    if (response.status == 200) {
                        return response.json();
                    }

                    else {
                        accs = new Array();
                    }
                })
                .then(response => {
                    accs = response;

                    accs.forEach(acc => {
                        var str = '';

                        str = acc.PhoneNumber;
                        acc.PhoneNumber = '(' + str.substr(0, 3) + ')-' + str.substr(3, 3) + '-' + str.substr(6);
                        acc.PaymentDueDate = new Date(acc.PaymentDueDate).toLocaleDateString();

                        if (acc.AmountDue == 0) {
                            acc.AmountDue = '$00.00';
                        }

                        else {
                            acc.AmountDue = '$' + acc.AmountDue;
                        }
                    });
                    this.accounts = accs.filter(acc => acc.AccountStatusId == 1);
                });
        }
    }
});