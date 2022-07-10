import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Indecision";
import Indecision from "@/components/Indecision";


describe('Indecision', () => {
    let wrapper;
    let clgSpy;
    let getAnswerSpy;
    global.fetch = jest.fn( () => Promise.resolve({
        json: () => Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/2.gif'
        }),
    }) );

    beforeEach(() => {
        wrapper = shallowMount( Counter );
        clgSpy = jest.spyOn( console, 'log' );
        getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' );
        jest.clearAllMocks();
    })
    
    test('Snapshot Match', () => {
            expect( wrapper.html() ).toMatchSnapshot();
    });
    
    test('Writing the input should not trigger the getAnswer() (log)', async () => {
        const input = wrapper.find( 'input' );
        await input.setValue( 'Hola Mundo' );

        expect( clgSpy ).toHaveBeenCalledTimes(1);
        expect( getAnswerSpy ).toHaveBeenCalledTimes( 0 );

    });
    
    test('When write the "?" should trigger the getAnswer()', async () => {
        const input = wrapper.find( 'input' );
        await input.setValue( '?' );

        expect( clgSpy ).toHaveBeenCalled();
        expect( getAnswerSpy ).toHaveBeenCalledTimes( 1 );
    });

    test( 'Test on getAnswer', async () => {

        await wrapper.vm.getAnswer();

        const img = wrapper.find( 'img' );
        expect( img.exists() ).toBeTruthy();
        expect( wrapper.vm.img ).toBe( 'https://yesno.wtf/assets/yes/2.gif' );
        expect( wrapper.vm.answer).toBe('Si!')

    } );

    test( 'Test on getAnswer - API Fail', async () => {
        fetch.mockImplementationOnce( () => Promise.reject( 'Api is down' ) );

        await wrapper.vm.getAnswer();
        const img = wrapper.find( 'img' );
        expect( img.exists() ).toBeFalsy();
        expect( wrapper.vm.answer ).toBe( 'No se pudo cargar el API' )
    });



})

