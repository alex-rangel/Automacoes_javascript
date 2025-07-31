import { chromium } from 'playwright';

(async () => {

    const navegador = await chromium.launch({
        headless: false, // precisa estar visível
        args: ['--start-maximized'] // maximiza a janela
    });

    const contexto = await navegador.newContext({
        viewport: null // importante: deixa o navegador usar o tamanho real da janela
    });

    const pagina = await contexto.newPage();

    // Acessar o site
    await pagina.goto('https://www.hashtagtreinamentos.com/');

    const botoes = await pagina.locator('.botao-verde').all();

    let novaAba = null;

    for (const botao of botoes) {
        const texto = (await botao.textContent())?.trim();

        if (texto && texto.includes('Quero aprender')) {
            await botao.scrollIntoViewIfNeeded();
            await botao.waitFor({ state: 'visible' });

            // Captura a nova aba quando ela for criada
            [novaAba] = await Promise.all([
                pagina.waitForEvent('popup'),
                botao.click()
            ]);
            break;
        }
    }

    if (novaAba) {
        await novaAba.waitForLoadState();
        await novaAba.goto('https://www.hashtagtreinamentos.com/curso-python');

        // Preencher formulário
        await novaAba.fill('#firstname', 'Alex Rangel');
        await novaAba.fill('#email', 'teste@teste.com');
        await novaAba.fill('#phone', '21999999999');

        // Clicar no botão "quero me inscrever"
        const botao = novaAba.locator('#_form_2475_submit');
        await botao.scrollIntoViewIfNeeded();
        await botao.click();
    }

    //Espera uns segundos só para você ver o resultado
    await pagina.waitForTimeout(5000);

    await navegador.close();

})();