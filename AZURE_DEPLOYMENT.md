# Deploying PlacementForge to Microsoft Azure

**Target Account:** `athithyapandi.24it@kct.ac.in`  
**GitHub Repository:** [https://github.com/ganeshragul068-star/Reimagine-Placement-Preparation](https://github.com/ganeshragul068-star/Reimagine-Placement-Preparation)

---

## Prerequisites (Student Account Activation)

Since your email is `athithyapandi.24it@kct.ac.in` (Kumaraguru College of Technology), you are eligible for **Azure for Students**:
- **Benefits:** \$100 Free Azure Credits + 12 Months of free services (No credit card required).
- **Activation Link:** [https://azure.microsoft.com/free/students/](https://azure.microsoft.com/free/students/)
- Sign in with your college email: `athithyapandi.24it@kct.ac.in` and complete student verification if not done already.

---

## Method 1: Azure App Service (Recommended for Full Next.js 15 Support)

Azure App Service (Linux, Node 20 LTS) provides native support for Next.js App Router, dynamic server routes, and the AI API routes (`/api/chat`, `/api/interview`, `/api/evaluate`, `/api/resume-audit`).

### Step 1: Sign in to Azure Portal
1. Navigate to **[https://portal.azure.com](https://portal.azure.com)**.
2. Sign in using `athithyapandi.24it@kct.ac.in`.

### Step 2: Create a Web App
1. In the search bar at the top, type **App Services** and click **Create** > **Web App**.
2. Fill in the **Basics** tab:
   - **Subscription:** Select `Azure for Students` (or your active subscription).
   - **Resource Group:** Click *Create new* and enter `rg-placementforge`.
   - **Name:** Enter a unique app name (e.g., `placementforge-app` or `placementforge-kct`).  
     *Your live site URL will be: `https://<your-name>.azurewebsites.net`*
   - **Publish:** `Code`
   - **Runtime stack:** `Node 20 LTS`
   - **Operating System:** `Linux`
   - **Region:** `Central India` (or `East US` / closest region).
   - **Pricing Plan:** Select `Free F1` or `Basic B1` (Free tier / covered by student credits).

### Step 3: Connect Continuous Deployment (GitHub)
1. Click the **Deployment** tab at the top.
2. Under **Continuous deployment**, toggle **Enable**.
3. Authorize your GitHub account (`ganeshragul068-star`).
4. Select:
   - **Organization:** `ganeshragul068-star`
   - **Repository:** `Reimagine-Placement-Preparation`
   - **Branch:** `main`
5. Azure will automatically add a GitHub Actions deployment workflow to your repository.

### Step 4: Add Environment Variables
Once the app resource is created:
1. In Azure Portal, go to your new App Service resource.
2. In the left navigation, select **Settings** > **Environment variables** (or **Configuration** on older UI).
3. Under **App settings**, click **+ Add**:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** `<Your Google Gemini API Key>`
4. Add another setting:
   - **Name:** `PORT`
   - **Value:** `8080`
5. Click **Apply** and confirm.

### Step 5: Configure Startup Command
1. In the left sidebar, click **Settings** > **Configuration** > **General settings**.
2. In the **Startup Command** field, enter:
   ```bash
   node .next/standalone/server.js
   ```
   *(Or `npm run start`)*
3. Click **Save**.

---

## Method 2: Azure Static Web Apps (Alternative)

1. In [portal.azure.com](https://portal.azure.com), search for **Static Web Apps** and click **Create**.
2. Select your `Azure for Students` subscription and resource group.
3. Name your app `placementforge-web`.
4. Choose **Plan type:** `Free`.
5. Under **Deployment details**, choose **GitHub** and select:
   - **Repository:** `Reimagine-Placement-Preparation`
   - **Branch:** `main`
6. Under **Build Presets**, select **Next.js**:
   - **App location:** `/`
   - **Api location:** *(leave blank)*
   - **Output location:** `.next`
7. Click **Review + Create**.
8. Go to **Configuration** on the Static Web App and add your `GEMINI_API_KEY`.

---

## Summary of URLs
- Azure Portal: [https://portal.azure.com](https://portal.azure.com)
- Azure for Students: [https://azure.microsoft.com/free/students/](https://azure.microsoft.com/free/students/)
- GitHub Source: [https://github.com/ganeshragul068-star/Reimagine-Placement-Preparation](https://github.com/ganeshragul068-star/Reimagine-Placement-Preparation)
