export default
( HelpersSetName, key, convert = true ) =>
{
    if( convert )
    {
        return HelpersSetName[ Object.keys( HelpersSetName ).filter( HelpersSetNameKeys => HelpersSetNameKeys === key ) ]
    }
    else
    {
        for( const keys in HelpersSetName )
            if( HelpersSetName[ keys ] === key ) return keys
    }
}