describe( 'Example Component', () => {

    test( 'Debe ser mayor que 10', () => {
        let value = 5;
        value += 6;
        expect( value ).toBeGreaterThan( 10 );
    } );
} );
