const 
    Correios = require(`node-correios`),
    config = require(`../../../config/correios/correios.js`),
    calcBox = require(`../../../helpers/correios/calcBox.js`),
    correios = new Correios()

    


async function calculateShipping( Cep, Product )
{ try {
console.log('estamos aqui tentando')
    let cart = Product.map( iterator => 
    ({ 
        
        unitaryValue : iterator.unitaryValue, // valor unitário
        quantity : iterator.quantity, // quantidade de produtos comprados
        width : iterator.variations.deliveries.dimensions.width, // larguraCm
        height : iterator.variations.deliveries.dimensions.height, // alturaCm
        length : iterator.variations.deliveries.dimensions.length, // profundidadeCm
        weight : iterator.variations.deliveries.weight // pesoKg
    }))

    let box = calcBox( cart ),
    totalValue = cart.reduce( ( acumulator, iterator ) => acumulator + iterator.unitaryValue * iterator.quantity, 0 ),
    totalWeight = cart.reduce( ( acumulator, iterator ) => acumulator + iterator.weight * iterator.quantity, 0 )

    let results = await Promise.all
    (
        config.nCdServico.split(`,`).map( async ( service ) =>
        {
            let result = await correios.calcPrecoPrazo
            ({
                nCdServico : service,
                nCdFormato : 1,
                nVlValorDeclarado : totalValue >= 20.5 && totalValue <= 10000  ?  totalValue  :  20.5,
                nVlPeso : totalWeight,
                nVlLargura : box.width > 20  ?  box.width  :  20,
                nVlAltura : box.height,
                nVlComprimento : box.length > 20  ?  box.length  :  20,
                nvlDiametro : 0,
                sCepOrigem : config.sCepOrigem,
                sCepDestino : Cep
            })
            return { ...result[0] }
        })
    )
 
    console.log(results)
    return results

} catch( error ) { console.error( error ) } }




module.exports = { calculateShipping }