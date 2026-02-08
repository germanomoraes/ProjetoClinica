# 🚀 GUIA DE INSTALAÇÃO - OdontoWise

## Por favor, siga estes passos para rodar o sistema:

### **OPÇÃO 1: Usar o Script de Setup (Recomendado)**

1. Abra o **Explorador de Arquivos**
2. Navegue até: `c:\Users\Germano Moraes\OneDrive\Área de Trabalho\OdontoWise`
3. **Clique com botão direito** em `setup.bat`
4. Selecione **"Executar como administrador"**
5. Aguarde a instalação das dependências
6. Depois siga as instruções que aparecerem

---

### **OPÇÃO 2: Instalação Manual (Passo a Passo)**

#### **Passo 1: Abra 2 Terminais (PowerShell ou CMD)**

Se estiver usando **PowerShell** e tiver erro de política de execução:
- Use **CMD** ao invés de PowerShell
- OU abra PowerShell como Administrador e execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### **Passo 2: Terminal 1 - Instalar e Rodar Backend**

```bash
cd "c:\Users\Germano Moraes\OneDrive\Área de Trabalho\OdontoWise\backend"
npm install
npm run dev
```

Você deve ver:
```
🦷 OdontoWise Backend rodando em http://localhost:5000
```

#### **Passo 3: Terminal 2 - Instalar e Rodar Frontend**

```bash
cd "c:\Users\Germano Moraes\OneDrive\Área de Trabalho\OdontoWise\frontend"
npm install
npm run dev
```

Você deve ver:
```
  VITE v... ready in XXX ms

  ➜  Local:   http://localhost:3000/
```

#### **Passo 4: Abra no Navegador**

Acesse: **http://localhost:3000**

---

## 🔐 Credenciais de Teste

Quando a página de login aparecer, use:

| Usuário | Senha |
|---------|-------|
| dentista1 | 1234 |
| dentista2 | 1234 |
| dentista3 | 1234 |
| secretaria | 1234 |

---

## ❌ Troubleshooting

### Erro: "npm.ps1 não pode ser carregado"

Use **CMD.exe** ao invés de PowerShell:

```cmd
C:\Windows\System32\cmd.exe
cd "c:\Users\Germano Moraes\OneDrive\Área de Trabalho\OdontoWise\backend"
npm install
npm run dev
```

### Erro: "npm: comando não encontrado"

Reinicie o seu computador após instalar Node.js, ou verifique se está em um terminal **novo**.

### Erro de conexão (Cannot connect to backend)

Certifique-se que:
1. ✅ Backend está rodando em `http://localhost:5000`
2. ✅ Frontend está rodando em `http://localhost:3000`
3. ✅ Ambos em terminais diferentes

### Porta 5000 ou 3000 já em uso

Mude para outra porta no arquivo correspondente:
- Backend: `backend/src/index.js` (linha `const PORT = 5000;`)
- Frontend: `frontend/vite.config.js` (linha `port: 3000,`)

---

## ✅ Confirmação de Sucesso

Quando tudo estiver funcionando, você deve ver:

```
BACKEND:
  🦷 OdontoWise Backend rodando em http://localhost:5000
  📚 API disponível em http://localhost:5000/api

FRONTEND:
  ➜  Local:   http://localhost:3000/
```

E no navegador (http://localhost:3000) mostrar a página de login com:
- Logo 🦷 OdontoWise
- Campo de Usuário
- Campo de Senha
- Botão "Entrar no Sistema"

---

**Pronto! O sistema está funcionando completamente em camadas!** 🎉

