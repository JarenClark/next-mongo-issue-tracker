class APIfeatures {

    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    // used to search for projects by name
    search() {
        const searchQ = this.queryString.searchQ ? {
            name: {
                $regex: this.queryString.searchQ,
                $options: 'i'
            }
        } : {}

        // console.log(searchQ)
        this.query = this.query.find({ ...searchQ })
        return this;
    }

    // will use to search projects by team they are assigned to
    filter() {
        const queryCopy = { ...this.queryString }

        console.log(queryCopy)
        const dontSearchTheseFields = ['name']
        dontSearchTheseFields.forEach(el => delete queryCopy['el'])

        this.query = this.query.find(queryCopy)
        return this;
    }
}



export default APIfeatures