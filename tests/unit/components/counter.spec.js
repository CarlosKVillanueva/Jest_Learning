import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter";

describe( 'Counter', () => {
    let wrapper;

    beforeEach( () => {
        wrapper = shallowMount( Counter );
    } );

    test( 'Debe hacer match con el snapshot', () => {
        expect( wrapper.html() ).toMatchSnapshot();

    } );

    test( 'h2 debe de tener el valor por defecto', () => {

        // Espera encontrar una etiqueta h10
        expect( wrapper.find( 'h2' ).exists() ).toBeTruthy();

        const h2Value = wrapper.find( 'h2' ).text();

        expect( h2Value ).toBe( 'Counter' );

    } );


    test( 'El valor por defecto debe ser 100 en el P', () => {const wrapper = shallowMount( Counter );

        const pTag = wrapper.find( '[data-testid="counter"]' );

        expect( ( pTag.text() ) ).toBe( '100' );
    } );

    test( 'Verificar Botones de +/-', async () => {
        const [ incresaseBtn, decreaseBtn ] = wrapper.findAll( 'button' );

        // IMPORTANTE EL ORDEN
        await incresaseBtn.trigger( 'click' );
        await incresaseBtn.trigger( 'click' );
        await incresaseBtn.trigger( 'click' );
        await decreaseBtn.trigger( 'click' );
        await decreaseBtn.trigger( 'click' );
        // CON ESTE VALUE, CLICKEA Y DESPUES LEEMOS PARA COMPARAR
        const value = wrapper.find( '[data-testid="counter"]' ).text();
        expect( value ).toBe( '101' );
    } );

    test('Read and Set the Default Value', () => {
        const { start } = wrapper.props();
        const value = wrapper.find( '[data-testid="counter"]' ).text();

        expect( +value ).toBe( start );
    });

    test( 'Should show prop title', () => {

        const title = 'Hola Mundo';
        const wrapper = shallowMount( Counter, {
            props: {
                title
            }
        } );

        expect( wrapper.find( 'h2' ).text() ).toBe( title );
    } );
} );