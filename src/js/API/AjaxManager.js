import ajaxSend from './ajaxSend'

export default class AjaxManager {

    getStartedList (callback){
        const options = {
            method: 'GET',
            query: "method=getStartedTickets",
            callback,
        }

        return ajaxSend(options)
    }

    getAllTikets(callback){
        const options = {
            method: "GET",
            query: 'method=allTickets',
            callback,
        }

        return ajaxSend(options)
    }

    createTicket(data, callback){
        const options = {
            method: 'POST',
            query: 'method=createTicket',
            data,
            callback,
        }

        return ajaxSend(options)
    }

    getIndex(id, callback){
        const options = {
            method:'GET',
            query: `method=getTicketById&id=${id}`,
            callback,
        }
        return ajaxSend(options)
    }

    delete(id, callback) {
        const options = {
            method: 'GET',
            query: `method=deleteTicket&id=${id}`,
            callback,
        }
        return ajaxSend(options)
    }

    isStatuschecked(id, callback){
        const options = {
            method: 'GET',
            query: `method=toggleStatusTicket&id=${id}`,
            callback,
        }
        return ajaxSend(options)
    }

    modification(data, callback){
        const options = {
            method: "POST",
            query:"method=editTichet",
            data,
            callback,
        }

        return ajaxSend(options)
    }

}