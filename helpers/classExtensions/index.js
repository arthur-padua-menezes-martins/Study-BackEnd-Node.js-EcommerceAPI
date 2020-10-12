module.exports =
{
    getSort: async sortType => {
        switch (sortType) {
            case `a-z`: return { title: 1 }
                break

            case `z-a`: return { title: 0 }
                break

            case `biggest-value`: return { value: 1 }
                break

            case `lowest-value`: return { value: 0 }
                break

            default: return {}
        }
    },

    getOffsetAndLimit: async ({ offset, limit, skip }) => {
        return offset ? {
            offset: Number(offset) || 0, limit: Number(limit) || 30
        } : {
                skip: Number(skip) || 0, limit: Number(limit) || 30
            }
    }
}