export default 
( key, checkers = 
    [ 
        'address', 
        'card', 
        'phone', 
        'password', 
        'salt', 
        'description',
        'categories',
        'variations',
        'assessments',
        'dimensions',
        'freeShipping',
        'weight',
        'images',
        'ticket',
        'payload', 
        '__v' ] 
) => { 
    
    return checkers.filter( item => item !== key ).length === checkers.length 
}