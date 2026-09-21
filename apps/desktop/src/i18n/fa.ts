import { defineLocale } from './define-locale'

/**
 * فارسی (fa) — Persian locale for the Hermes desktop app.
 *
 * 这是**部分翻译**（P1 首批，219 键）：
 * - `defineLocale()` 以 en 为基底深合并，未列出的键自动回退英文
 *   （运行时解析顺序：fa → en → key 本身，见 ./runtime.ts），
 *   因此永远不会出现空串或裸键名。全量翻译见 P2。
 * - 新增的英文键由 `scripts/check-locale-keys.mjs` 报告，增量补译进本文件。
 *
 * 约定（术语表，保持一致）：
 *   session → نشست        model → مدل          provider → ارائهدهنده
 *   API key → کلید API    settings → تنظیمات   sidebar → نوار کنار
 *   chat → گفتوگو         gateway → گیتوی       workspace → فضای کاری
 * 产品名/技术名词（Hermes、JSON、CLI、URL、模型 id 等）保留拉丁字母，便于检索。
 */
export const fa = defineLocale({
  language: {
    label: 'زبان',
    description: 'زبان رابط کاربری دسکتاپ را انتخاب کنید.',
    saving: 'در حال ذخیرهٔ زبان…',
    saveError: 'تغییر زبان ناموفق بود',
    switchTo: 'تغییر زبان',
    searchPlaceholder: 'جستوجوی زبانها…',
    noResults: 'زبانی پیدا نشد'
  },

  common: {
    apply: 'اعمال',
    back: 'بازگشت',
    save: 'ذخیره',
    saving: 'در حال ذخیره…',
    cancel: 'انصراف',
    change: 'تغییر',
    choose: 'انتخاب',
    clear: 'پاک کردن',
    close: 'بستن',
    collapse: 'جمع کردن',
    confirm: 'تأیید',
    connect: 'اتصال',
    connecting: 'در حال اتصال',
    continue: 'ادامه',
    bots: 'رباتها',
    copied: 'کپی شد',
    copy: 'کپی',
    copyFailed: 'کپی انجام نشد',
    delete: 'حذف',
    docs: 'مستندات',
    done: 'انجام شد',
    error: 'خطا',
    expand: 'باز کردن',
    failed: 'ناموفق',
    formatJson: 'قالببندی JSON',
    free: 'رایگان',
    loading: 'در حال بارگذاری…',
    notSet: 'تنظیم نشده',
    refresh: 'بازخوانی',
    remove: 'برداشتن',
    replace: 'جایگزینی',
    retry: 'تلاش دوباره',
    run: 'اجرا',
    send: 'ارسال',
    set: 'تنظیم',
    skip: 'رد کردن',
    update: 'بهروزرسانی',
    tryHint: term => `امتحان کنید: «${term}»`,
    on: 'روشن',
    off: 'خاموش'
  },

  boot: {
    ready: 'Hermes Desktop آماده است',
    desktopBootFailedWithMessage: message => `راهاندازی برنامه ناموفق بود: ${message}`,
    steps: {
      connectingGateway: 'اتصال به گیتوی زندهٔ دسکتاپ',
      loadingSettings: 'بارگذاری تنظیمات Hermes',
      loadingSessions: 'بارگذاری نشستهای اخیر',
      retryingRemoteBackend: 'اتصال دوباره به بکاند راه دور Hermes…',
      startingDesktopConnection: 'شروع اتصال دسکتاپ',
      startingHermesDesktop: 'راهاندازی Hermes Desktop…'
    },
    errors: {
      backgroundExited:
        'سرویسی که گفتوگوها را اجرا میکند بهطور غیرمنتظره بسته شد. برای ادامه آن را دوباره راهاندازی کنید — گفتوگوها و تنظیمات شما امن هستند.',
      backgroundExitedDuringStartup: 'Hermes بلافاصله پس از شروع، متوقف شد.',
      backendStopped: 'Hermes در پسزمینه از کار افتاد',
      restartHermes: 'راهاندازی دوبارهٔ Hermes',
      openLogs: 'باز کردن گزارشها',
      desktopBootFailed: 'Hermes شروع نشد',
      gatewayConnectionLost: 'ارتباط Hermes قطع شد',
      gatewayConnectionLostDetail:
        'در حال تلاش برای اتصال دوباره هستیم. میتوانید به خواندن و نوشتن ادامه دهید. اگر ادامه پیدا کرد، همین حالا دوباره وصل شوید یا تنظیمات اتصال را بررسی کنید.',
      reconnectNow: 'همین حالا اتصال دوباره',
      connectionSettings: 'تنظیمات اتصال',
      gatewaySignInRequired: 'Hermes راه دور شما را خارج کرد',
      gatewaySignInRequiredDetail: 'برای اتصال دوباره وارد شوید. گفتوگوها و تنظیمات شما امن هستند.',
      signInAgain: 'ورود دوباره',
      ipcBridgeUnavailable: 'Hermes Desktop نتوانست با لایهٔ پسزمینهٔ خود ارتباط بگیرد. برنامه را دوباره اجرا کنید.'
    },
    causes: {
      exitedEarly: 'سرویس پسزمینهٔ Hermes بلافاصله پس از شروع متوقف شد.',
      timedOut: 'سرویس پسزمینهٔ Hermes در زمان مقرر پاسخ نداد.',
      permission: 'Hermes نتوانست در پوشهٔ دادهٔ خود بنویسد (مشکل دسترسی).',
      diskFull: 'فضای دیسک پر است، بنابراین Hermes نتوانست شروع شود.',
      portInUse: 'برنامهٔ دیگری از پورت شبکهٔ موردنیاز Hermes استفاده میکند.',
      installMissing: 'بخشی از نصب Hermes موجود نیست. گزینهٔ «تعمیر نصب» را انتخاب کنید.'
    },
    failure: {
      title: 'Hermes شروع نشد',
      description:
        'سرویس پسزمینهٔ Hermes بالا نیامد. یکی از راههای بازیابی زیر را امتحان کنید. هیچکدام از این کارها گفتوگوها یا تنظیمات شما را پاک نمیکند.',
      details: 'جزئیات',
      remoteTitle: 'ورود به گیتوی راه دور لازم است',
      remoteDescription:
        'نشست گیتوی راه دور شما منقضی شده است. برای اتصال دوباره وارد شوید. هیچکدام از این کارها گفتوگوها یا تنظیمات شما را پاک نمیکند.',
      retry: 'تلاش دوباره',
      repairInstall: 'تعمیر نصب',
      useLocalGateway: 'استفاده از گیتوی محلی',
      gatewaySettings: 'تنظیمات گیتوی',
      back: 'بازگشت',
      openLogs: 'باز کردن گزارشها',
      repairHint: 'تعمیر، نصبکننده را دوباره اجرا میکند و روی یک دستگاه نو ممکن است چند دقیقه طول بکشد.',
      remoteSignInHint: signInLabel =>
        `از نشست مرورگر راه دور ذخیرهشده خارج میشود و سپس ${signInLabel} را باز میکند. برای استفاده از بکاند همراه، «استفاده از گیتوی محلی» را انتخاب کنید.`,
      signOutAndSignIn: 'خروج و ورود دوباره',
      remoteFailureHint: 'نشانی گیتوی و ورود را در تنظیمات گیتوی بررسی کنید یا به گیتوی محلی سوئیچ کنید.',
      cloudDownTitle: 'عامل Nous Cloud از کار افتاده است',
      cloudDownDescription:
        'عاملی که این گیتوی به آن وصل میشود خطای سرور برمیگرداند. از اینجا قابل راهاندازی دوباره نیست — وضعیت آن را بررسی کنید، به گیتوی محلی سوئیچ کنید یا از پشتیبانی کمک بگیرید.',
      cloudDownHint: 'دکمههای زیر Nous Portal (وضعیت و کنترل نمونه) و دیسکورد ما را برای پشتیبانی باز میکنند.',
      cloudDownCheckPortal: 'بررسی وضعیت Portal',
      cloudDownDiscord: 'کمک در دیسکورد',
      hideRecentLogs: 'پنهان کردن گزارشهای اخیر',
      showRecentLogs: 'نمایش گزارشهای اخیر',
      signedInTitle: 'وارد شدید',
      signedInMessage: 'در حال اتصال دوباره به گیتوی راه دور…',
      signInIncompleteTitle: 'ورود کامل نشد',
      signInIncompleteMessage: 'پنجرهٔ ورود پیش از پایان احراز هویت بسته شد.',
      signInFailed: 'ورود ناموفق بود',
      signInToRemoteGateway: 'ورود به گیتوی راه دور',
      signInWithProvider: provider => `ورود با ${provider}`,
      identityProvider: 'ارائهدهندهٔ هویت شما'
    }
  },

  errors: {
    genericFailure: 'مشکلی پیش آمد',
    boundaryTitle: 'اشکالی در رابط کاربری پیش آمد',
    boundaryDesc: 'این نما با خطای پیشبینینشده روبهرو شد. گفتوگوها و تنظیمات شما امن هستند.',
    boundaryDetails: 'جزئیات',
    sendDiagnostics: 'ارسال گزارش تشخیصی',
    reloadWindow: 'بارگذاری دوبارهٔ پنجره',
    openLogs: 'باز کردن گزارشها'
  },

  ui: {
    search: {
      clear: 'پاک کردن جستوجو'
    },
    pagination: {
      label: 'صفحهبندی',
      previous: 'قبلی',
      previousAria: 'رفتن به صفحهٔ قبلی',
      next: 'بعدی',
      nextAria: 'رفتن به صفحهٔ بعدی'
    },
    sidebar: {
      title: 'نوار کنار',
      description: 'نوار کنار در حالت موبایل را نشان میدهد.',
      toggle: open => `${open ? 'نمایش' : 'پنهان کردن'} نوار کنار`
    }
  },

  modelPicker: {
    title: 'تغییر مدل',
    current: 'فعلی:',
    unknown: '(ناشناس)',
    search: 'فیلتر ارائهدهندهها و مدلها…',
    noModels: 'مدلی پیدا نشد.',
    addProvider: 'افزودن ارائهدهنده',
    loadFailed: 'بارگذاری مدلها ناموفق بود',
    loadingIntoMemory: 'بارگذاری در حافظه',
    downloading: 'در حال دانلود',
    localDownloadsHeading: 'محلی',
    noAuthenticatedProviders: 'ارائهدهندهٔ احراز هویتشدهٔ وجود ندارد.',
    pro: 'حرفهای',
    proNeedsSubscription: 'مدلهای حرفهای به اشتراک پولی Nous نیاز دارند.',
    free: 'رایگان',
    freeTier: 'سطح رایگان',
    priceTitle: 'قیمت ورودی / خروجی بهازای هر میلیون توکن',
    wasPrice: 'قبلاً'
  },

  onboarding: {
    headerTitle: 'بیایید Hermes Agent را برای شما راهاندازی کنیم',
    headerDesc: 'برای شروع گفتوگو یک ارائهدهندهٔ مدل وصل کنید. بیشتر گزینهها با یک کلیک انجام میشوند.',
    preparingInstall: 'Hermes در حال پایان نصب است. در اجرای اول معمولاً کمتر از یک دقیقه طول میکشد.',
    starting: 'در حال راهاندازی Hermes…',
    lookingUpProviders: 'در حال جستوجوی ارائهدهندهها…',
    collapse: 'جمع کردن',
    otherProviders: 'ارائهدهندههای دیگر',
    haveApiKey: 'کلید API دارم',
    chooseLater: 'بعداً یک ارائهدهنده انتخاب میکنم',
    recommended: 'پیشنهادی',
    connected: 'وصل شد',
    featuredPitch: 'یک اشتراک، بیش از ۳۰۰ مدل پیشرو — روش پیشنهادی برای اجرای Hermes',
    fireworksPitch: 'API مستقیم مدلها — مدلهای پیشرو میزبانی Fireworks',
    localModelsTitle: 'اجرای مدلها بهصورت محلی',
    localModelsPitch: 'بدون نیاز به حساب — یک مدل دانلود کنید و روی همین دستگاه اجرا کنید',
    openRouterPitch: 'یک کلید، صدها مدل — انتخاب پیشفرض مطمئن',
    apiKeyOptions: {
      fireworks: {
        short: 'API مستقیم مدلها',
        description: 'دسترسی مستقیم به مدلهای میزبانی Fireworks AI.'
      },
      openrouter: {
        short: 'یک کلید، مدلهای فراوان',
        description: 'صدها مدل پشت یک کلید. انتخاب خوبی برای نصبهای تازه.'
      },
      openai: { short: 'مدلهای کلاس GPT', description: 'دسترسی مستقیم به مدلهای OpenAI.' },
      gemini: { short: 'مدلهای Gemini', description: 'دسترسی مستقیم به مدلهای Google Gemini.' },
      xai: { short: 'مدلهای Grok', description: 'دسترسی مستقیم به مدلهای xAI Grok.' },
      local: {
        short: 'میزبانی شخصی',
        description:
          'Hermes را به یک نقطهٔ پایانی سازگار با OpenAI (vLLM، llama.cpp، Ollama و…) روی همین دستگاه یا سرور خودتان وصل کنید.'
      }
    },
    backToSignIn: 'بازگشت به ورود',
    getKey: 'گرفتن کلید',
    replaceCurrent: 'جایگزینی مقدار فعلی',
    pasteApiKey: 'چسباندن کلید API',
    localApiKeyPlaceholder: 'کلید API (اختیاری — فقط اگر نقطهٔ پایانی شما کلید لازم دارد)',
    couldNotSave: 'ذخیرهٔ اعتبارنامه ممکن نشد.',
    connecting: 'در حال اتصال',
    update: 'بهروزرسانی',
    flowSubtitles: {
      pkce: 'مرورگر شما را برای ورود باز میکند و سپس همینجا ادامه مییابد',
      device_code: 'یک صفحهٔ تأیید در مرورگر باز میکند — Hermes خودکار وصل میشود',
      external: 'یکبار در ترمینال خود وارد شوید، سپس به گفتوگو برگردید'
    },
    startingSignIn: provider => `شروع ورود برای ${provider}…`,
    verifyingCode: provider => `در حال بررسی کد شما با ${provider}…`,
    connectedProvider: provider => `${provider} وصل شد`,
    connectedPicking: provider => `${provider} وصل شد. در حال انتخاب مدل پیشفرض…`,
    signInFailed: 'ورود ناموفق بود. دوباره تلاش کنید.',
    signInExpired:
      'صفحهٔ ورود پیش از تکمیل شما منقضی شد. دوباره تلاش کنید و مرحلهٔ مرورگر را در چند دقیقه تمام کنید، یا از کلید API استفاده کنید.',
    signInDidNotFinish: provider =>
      `ورود با ${provider} تمام نشد. اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید، یا ارائهدهندهٔ دیگری انتخاب کنید.`,
    tryAgain: 'تلاش دوباره',
    useApiKeyInstead: 'استفاده از کلید API',
    errorDetails: 'جزئیات',
    pickDifferentProvider: 'انتخاب ارائهدهندهٔ دیگر',
    signInWith: provider => `ورود با ${provider}`,
    openedBrowser: provider => `${provider} را در مرورگر شما باز کردیم.`,
    authorizeThere: 'همانجا به Hermes اجازه دهید.',
    copyAuthCode: 'کد مجوز را کپی کنید و زیر بچسبانید.',
    pasteAuthCode: 'چسباندن کد مجوز',
    reopenAuthPage: 'باز کردن دوبارهٔ صفحهٔ مجوز',
    autoBrowser: provider =>
      `${provider} را در مرورگر شما باز کردیم. همانجا به Hermes اجازه دهید و بهطور خودکار وصل میشوید — چیزی برای کپی یا چسباندن نیست.`,
    reopenSignInPage: 'باز کردن دوبارهٔ صفحهٔ ورود',
    waitingAuthorize: 'در انتظار اجازهٔ شما…',
    externalPending: provider =>
      `${provider} از طریق CLI خودش وارد میشود. این دستور را در ترمینال اجرا کنید، سپس برگردید و «وارد شدم» را انتخاب کنید:`,
    signedIn: 'وارد شدم',
    deviceCodeOpened: provider => `${provider} را در مرورگر شما باز کردیم. این کد را همانجا وارد کنید:`,
    reopenVerification: 'باز کردن دوبارهٔ صفحهٔ تأیید',
    copy: 'کپی',
    defaultModel: 'مدل پیشفرض',
    freeTier: 'سطح رایگان',
    pro: 'حرفهای',
    free: 'رایگان',
    price: (input, output) => `${input} ورودی / ${output} خروجی بهازای هر میلیون توکن`,
    change: 'تغییر',
    startChatting: 'شروع',
    docs: provider => `مستندات ${provider}`
  }
})
