import React, { useState } from 'react'

import MainTitle from '../../components/Text/MainTitle.js'
import SimpleButton from '../../components/Button/SimpleButton.js'
import InformationText from '../../components/Text/InformationText.js'
import StateInput from '../../components/Input/StateInput.js'
import DynamicList from '../../components/List/DynamicList.js'


function Settings() { 

    let [ storeAddress, setStoreAddress ] = useState({
        'name'  : 'Sertão Nerd',
        'CNPJ' : '',
        'email' : 'nerdanalisando@gmail.com',
        'phones' : [ '85 98548-6468', '85 99920-3361', '85 3492-1005' ],
        'street' : 'Rua Doutor Justa Araújo',
        'number' : '185',
        'district' : 'Serrinha',
        'city' : 'Fortaleza',
        'state' : 'CE'
    }),

    storeAddressInfos = [{},{}]
    for( const keys in storeAddress ) { keys !== 'phones'  ?  storeAddressInfos[0][keys] = storeAddress[keys]  :  storeAddressInfos[1][keys] = storeAddress[keys] }


    function RenderHeader() { return (
    
        <article className='RenderHeader'>

            <article> 
                <MainTitle type='h2' title='Configurações'/>
            </article>

            <article>
                <SimpleButton onClick = { () => alert('FUNCIONOU!!!!!') } type='success' placeholder='SALVAR'/>
            </article>

        </article>

    )} 
    

    function RenderSettingsAddress() 
    {
        let Informations = [], InformationsInput = [], InformationsDynamicList = [], label
        
        for( const keys in storeAddressInfos[0] ) 
        {
            label = keys==='name' ? 'nome' : keys==='CNPJ' ? 'CNPJ' : keys==='email' ? 'e-mail' : keys==='street' ? 'rua' : keys==='number' ? 'número' : keys==='district' ? 'bairro' : keys==='city' ? 'cidade' : keys==='state' ? 'estado' : ''

            InformationsInput.push( <section className='SettingsAddress'><InformationText value = { <StateInput onSave = { newValue => { setStoreAddress( { ...storeAddress, [keys] : newValue } ) } } oldValue = { storeAddress[keys] } /> } keys = { label }/></section> )
        }

        for( const keys in storeAddressInfos[1] ) 
        {
            label = keys==='phones' ? 'telefones' : ''

            InformationsInput.push( <section className='SettingsAddress'><InformationText value = { <DynamicList onAdd = { ( newValue ) => { setStoreAddress( { ...storeAddress, [keys] : [ ...storeAddress[keys], newValue ] } ) } } onRemove = { ( idx ) => { setStoreAddress( { ...storeAddress, [keys] : storeAddress[keys].filter( ( iterator, index ) => index !== idx ) } ) } } info = { storeAddress[keys] } /> } keys = { label }/></section> )
        }

        Informations.push( InformationsInput, InformationsDynamicList )
  
        return InformationsInput
    }
    

return (

    <section className='Settings'>

        { RenderHeader() }

        <section>

            <article>

                { RenderSettingsAddress() }

            </article>

        </section>

    </section>

)}


export default Settings