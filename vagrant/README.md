### Como visualizar os dados coletados:
1. Após rodar o monitoramento, o Netdata estará disponível na porta 19999 da VM2.
2. Acesse no seu navegardor: `http://192.168.56.20:19999`.
3. Para testar o alerta de CPU, acesse a VM2 via SSH e rode o comando:
    `stress-ng --cpu 0 --load 85 --timeout 60s`
4. Monitore o e-mail configurado ou a dashboard do Netdata para verificar a notificação de alerta.