export type Locale =
  | "en"
  | "zh"
  | "zh-hant"
  | "ja"
  | "de"
  | "es"
  | "fr"
  | "tr"
  | "uk"
  | "af"
  | "ko"
  | "it"
  | "ga"
  | "pt"
  | "ru"
  | "hu"
  | "ar"
  | "fa";

export interface Translations {
  // ── Common ──
  common: {
    save: string;
    saving: string;
    cancel: string;
    close: string;
    confirm: string;
    delete: string;
    refresh: string;
    retry: string;
    /** Optional — English fallback until translated. "{what}" = the noun that failed to load. */
    loadFailed?: string;
    loadFailedDetails?: string;
    search: string;
    loading: string;
    create: string;
    creating: string;
    set: string;
    replace: string;
    clear: string;
    live: string;
    off: string;
    enabled: string;
    disabled: string;
    active: string;
    inactive: string;
    unknown: string;
    untitled: string;
    none: string;
    form: string;
    noResults: string;
    of: string;
    page: string;
    msgs: string;
    tools: string;
    match: string;
    other: string;
    configured: string;
    removed: string;
    failedToToggle: string;
    failedToRemove: string;
    failedToReveal: string;
    collapse: string;
    expand: string;
    general: string;
    messaging: string;
    // Optional: non-English locales fall back to the English literal in the
    // component until translated, matching the enriched-profiles keys.
    gateway?: string;
    gatewayHint?: string;
    pluginLoadFailed: string;
    pluginNotRegistered: string;
    allAuxTasks?: string;
    current?: string;
    appliesToNewSessions?: string;
    loadingChat?: string;
    logOut?: string;
  };

  auxTasks?: {
    vision?: string;
    visionHint?: string;
    compression?: string;
    compressionHint?: string;
    skills_hub?: string;
    skills_hubHint?: string;
    approval?: string;
    approvalHint?: string;
    mcp?: string;
    mcpHint?: string;
    title_generation?: string;
    title_generationHint?: string;
    review?: string;
    reviewHint?: string;
    triage_specifier?: string;
    triage_specifierHint?: string;
    kanban_decomposer?: string;
    kanban_decomposerHint?: string;
    profile_describer?: string;
    profile_describerHint?: string;
    curator?: string;
    curatorHint?: string;
  };

  // ── App shell ──
  app: {
    brand: string;
    brandShort: string;
    closeNavigation: string;
    closeModelTools: string;
    footer: {
      org: string;
    };
    activeSessionsLabel: string;
    gatewayStatusLabel: string;
    gatewayStrip: {
      degraded?: string;
      failed: string;
      heartbeatStale?: string;
      off: string;
      running: string;
      starting: string;
      stopped: string;
    };
    nav: {
      analytics: string;
      chat: string;
      config: string;
      cron: string;
      documentation: string;
      keys: string;
      logs: string;
      models: string;
      profiles: string;
      plugins: string;
      sessions: string;
      skills: string;
      channels?: string;
      files?: string;
      webhooks?: string;
      pairing?: string;
      system?: string;
    };
    modelToolsSheetSubtitle: string;
    modelToolsSheetTitle: string;
    navigation: string;
    openDocumentation: string;
    openNavigation: string;
    pluginNavSection: string;
    sessionsActiveCount: string;
    statusOverview: string;
    system: string;
    webUi: string;
    /** Optional — fall back to English literals until translated. */
    managingProfile?: string;
    currentProfileOption?: string;
    managingProfileBanner?: string;
    /** NS-656 memory-pressure banner — optional, English fallback. */
    memoryOomRestartBanner?: string;
    memoryCriticalBanner?: string;
    memoryElevatedBanner?: string;
    /** NS-656 disk-usage banner — optional, English fallback. */
    diskCriticalBanner?: string;
    diskElevatedBanner?: string;
    dismiss?: string;
  };

  // ── Status page ──
  status: {
    actionFailed: string;
    actionFinished: string;
    actions: string;
    agent: string;
    connected: string;
    connectedPlatforms: string;
    disabled?: string;
    disconnected: string;
    error: string;
    failed: string;
    gateway: string;
    gatewayFailedToStart: string;
    lastUpdate: string;
    noneRunning: string;
    notRunning: string;
    pid: string;
    platformDisconnected: string;
    platformError: string;
    activeSessions: string;
    recentSessions: string;
    restartGateway: string;
    restartGatewayConfirmMessage?: string;
    restartGatewayConfirmTitle?: string;
    restartingGateway: string;
    running: string;
    runningRemote: string;
    startFailed: string;
    starting: string;
    startedInBackground: string;
    stopped: string;
    updateHermes: string;
    updateHermesConfirmMessage?: string;
    updateHermesConfirmNow?: string;
    updateHermesConfirmTitle?: string;
    updatingHermes: string;
    waitingForOutput: string;
  };

  // ── Sessions page ──
  sessions: {
    title: string;
    history: string;
    overview: string;
    filterChats: string;
    filterAutomation: string;
    filterAll: string;
    sourceFilter: string;
    anySource: string;
    searchPlaceholder: string;
    noSessions: string;
    noSessionsInFilter: string;
    noMatch: string;
    startConversation: string;
    noMessages: string;
    untitledSession: string;
    deleteSession: string;
    confirmDeleteTitle: string;
    confirmDeleteMessage: string;
    sessionDeleted: string;
    failedToDelete: string;
    deleteEmpty: string;
    deleteEmptyConfirmTitle: string;
    deleteEmptyConfirmMessage: string;
    emptySessionsDeleted: string;
    failedToDeleteEmpty: string;
    selectSession: string;
    selectAllOnPage: string;
    clearSelection: string;
    selectedCount: string;
    deleteSelected: string;
    deleteSelectedConfirmTitle: string;
    deleteSelectedConfirmMessage: string;
    selectedSessionsDeleted: string;
    failedToDeleteSelected: string;
    resumeInChat: string;
    newChat: string;
    previousPage: string;
    nextPage: string;
    // Optional — added by the fa fork for strings that bypassed i18n.
    renameSession?: string;
    exportSession?: string;
    exportSessionJson?: string;
    saveTitle?: string;
    cancelRename?: string;
    sessionTitlePlaceholder?: string;
    contextHandoff?: string;
    anyChatSource?: string;
    anyAutomationSource?: string;
    chatSources?: string;
    automationSources?: string;
    noSources?: string;
    /** "{count}" = number of selected source filters. */
    sourcesCount?: string;
    /** Label shown for a session that has no source at all. */
    localSource?: string;
    pruneOldSessions?: string;
    pruneDescription?: string;
    olderThanDays?: string;
    prune?: string;
    statTotal?: string;
    statActiveInStore?: string;
    statArchived?: string;
    statMessages?: string;
    statSources?: string;
    importSessions?: string;
    importSessionsAria?: string;
    importSessionsTitle?: string;
    /** "{summary}" = result of lib/session-import importSummary(). */
    importComplete?: string;
    importFailed?: string;
    sessionRenamed?: string;
    failedToRename?: string;
    failedToExport?: string;
    invalidDays?: string;
    failedToPrune?: string;
    roles: {
      user: string;
      assistant: string;
      system: string;
      tool: string;
    };
  };

  // ── Analytics page ──
  analytics: {
    period: string;
    totalTokens: string;
    totalSessions: string;
    apiCalls: string;
    dailyTokenUsage: string;
    dailyBreakdown: string;
    perModelBreakdown: string;
    topSkills: string;
    skill: string;
    loads: string;
    edits: string;
    lastUsed: string;
    input: string;
    output: string;
    total: string;
    noUsageData: string;
    startSession: string;
    date: string;
    model: string;
    tokens: string;
    perDayAvg: string;
    acrossModels: string;
    inOut: string;
  };

  // ── Models page ──
  models: {
    modelsUsed: string;
    estimatedCost: string;
    tokens: string;
    sessions: string;
    avgPerSession: string;
    apiCalls: string;
    toolCalls: string;
    noModelsData: string;
    startSession: string;
    settingsTitle?: string;
    tokenAnalyticsPrefix?: string;
    tokenAnalyticsMid?: string;
    tokenAnalyticsSuffix?: string;
    expensiveModelWarning?: string;
    auxSummaryTitle?: string;
    auxSummaryAllAuto?: (n: number) => string;
    moaTitle?: string;
    moaNotLoaded?: string;
    configure?: string;
    setMainModel?: string;
    cacheRead?: string;
    reasoning?: string;
    input?: string;
    output?: string;
  };

  // ── Logs page ──
  logs: {
    title: string;
    autoRefresh: string;
    file: string;
    level: string;
    component: string;
    lines: string;
    noLogLines: string;
  };

  // ── Cron page ──
  cron: {
    /** Optional — English fallback until translated. */
    loadWhat?: string;
    scriptRequired?: string;
    confirmDeleteMessage: string;
    confirmDeleteTitle: string;
    newJob: string;
    nameOptional: string;
    namePlaceholder: string;
    prompt: string;
    promptPlaceholder: string;
    schedule: string;
    schedulePlaceholder: string;
    scheduleMode: string;
    scheduleModes: {
      interval: string;
      daily: string;
      weekly: string;
      monthly: string;
      once: string;
      custom: string;
      intervalEvery: string;
      intervalUnit: string;
      unitMinutes: string;
      unitHours: string;
      unitDays: string;
      timeOfDay: string;
      weekdays: string;
      weekdaysShort: [string, string, string, string, string, string, string];
      dayOfMonth: string;
      onceAt: string;
      customLabel: string;
      customPlaceholder: string;
      customHint: string;
      preview: string;
      previewEmpty: string;
    };
    scheduleDescribe: {
      none: string;
      everyMinutes: string;
      everyHours: string;
      everyDays: string;
      dailyAt: string;
      weeklyAt: string;
      monthlyAt: string;
      onceAt: string;
    };
    deliverTo: string;
    scheduledJobs: string;
    noJobs: string;
    last: string;
    next: string;
    overdueSince?: string;
    schedulerLastTicked?: string;
    pause: string;
    resume: string;
    triggerNow: string;
    delivery: {
      local: string;
      telegram: string;
      discord: string;
      slack: string;
      email: string;
      needsHomeChannel?: string;
      noneConfigured?: string;
    };
    /** fa fork: cron-page strings that had bypassed i18n. Optional (like the
     *  rest of the fa-added members) so untranslated locales keep compiling;
     *  the page falls back to the English literal. */
    advancedFields?: string;
    provider?: string;
    model?: string;
    defaultOption?: string;
    baseUrlOverride?: string;
    script?: string;
    workdir?: string;
    contextFromPlaceholder?: string;
    noToolsets?: string;
    skillsOptional?: string;
    noSkills?: string;
    skillsHint?: string;
    viewJobs?: string;
    viewBlueprints?: string;
    profile?: string;
    allProfiles?: string;
    editJob?: string;
    saveChanges?: string;
    savedChanges?: string;
  };

  // ── Plugins page ──
  pluginsPage: {
    contextEngineLabel: string;
    dashboardSlots: string;
    disableRuntime: string;
    enableAfterInstall: string;
    enableRuntime: string;
    forceReinstall: string;
    headline: string;
    identifierLabel: string;
    inactive: string;
    installBtn: string;
    installHeading: string;
    installHint: string;
    memoryProviderLabel: string;
    missingEnvWarn: string;
    noDashboardTab: string;
    openTab: string;
    orphanHeading: string;
    pluginListHeading: string;
    providerDefaults: string;
    providersHeading: string;
    providersHint: string;
    /** /plugins — memory/context-engine card intro sentence. */
    providersIntro?: string;
    /** /plugins — shown when the built-in MEMORY.md/USER.md files are in use. */
    memoryBuiltinHint?: string;
    saveMemoryProvider?: string;
    saveContextEngine?: string;
    refreshDashboard: string;
    removeConfirm: string;
    removeHint: string;
    rescanHeading: string;
    rescanHint: string;
    runtimeHeading: string;
    saveProviders: string;
    savedProviders: string;
    sourceBadge: string;
    authRequired: string;
    authRequiredHint: string;
    updateGit: string;
    versionBadge: string;
    showInSidebar: string;
    hideFromSidebar: string;
    // Catalog section (en-only fallback convention — optional keys).
    catalogHeading?: string;
    catalogHint?: string;
    catalogSearchPlaceholder?: string;
    catalogEmpty?: string;
    catalogEmptyDocsLink?: string;
    catalogInstallBtn?: string;
    catalogInstalledBadge?: string;
    catalogUpdateBtn?: string;
    catalogRemovedBadge?: string;
    catalogConfirmTitle?: string;
    catalogConfirmInstallNote?: string;
    catalogRequiresEnv?: string;
    removedFromCatalog?: string;
    setupResults?: string;
    pythonDependencies?: string;
    saveFailed?: string;
    failed?: string;
  };

  // ── Profiles page ──
  profiles: {
    newProfile: string;
    name: string;
    namePlaceholder: string;
    nameRequired: string;
    nameRule: string;
    invalidName: string;
    cloneFrom: string;
    cloneFromNone: string;
    allProfiles: string;
    noProfiles: string;
    defaultBadge: string;
    hasEnv: string;
    model: string;
    skills: string;
    rename: string;
    editSoul: string;
    soulSection: string;
    soulPlaceholder: string;
    saveSoul: string;
    soulSaved: string;
    openInTerminal: string;
    commandCopied: string;
    copyFailed: string;
    confirmDeleteTitle: string;
    confirmDeleteMessage: string;
    created: string;
    deleted: string;
    renamed: string;
    // Optional keys added for the enriched profiles experience. Non-English
    // locales fall back to the English literal in the component until
    // translated, so these are optional to avoid churning every locale file.
    activeProfile?: string;
    activeBadge?: string;
    setActive?: string;
    activeSet?: string;
    gatewayRunning?: string;
    gatewayStopped?: string;
    gatewayRunningWarning?: string;
    aliasBadge?: string;
    description?: string;
    descriptionPlaceholder?: string;
    noDescription?: string;
    editDescription?: string;
    descriptionSaved?: string;
    reviewBadge?: string;
    autoGenerate?: string;
    generating?: string;
    describeFailed?: string;
    distribution?: string;
    advancedOptions?: string;
    cloneAll?: string;
    noSkillsOption?: string;
    descriptionOptional?: string;
    modelOptional?: string;
    modelInherit?: string;
    modelLoading?: string;
    modelNone?: string;
    editModel?: string;
    modelSaved?: string;
    modelSelect?: string;
    actions?: string;
    manageSkills?: string;
    activeSetHint?: string;
  };

  // ── Skills page ──
  skills: {
    title: string;
    searchPlaceholder: string;
    /** Optional — English fallback until translated. */
    loadWhat?: string;
    browseHub?: string;
    /** Sidebar tab ("Browse hub") — distinct from the page's `browseHub` CTA. */
    browseHubTab?: string;
    learnSkill?: string;
    /** /skills — the "New skill" CTA + the create-dialog title. */
    newSkill?: string;
    editSkillFile?: string;
    /** "{name}" = the skill's name. */
    editSkillNamed?: string;
    verdictSafe?: string;
    verdictCaution?: string;
    verdictDangerous?: string;
    hubSearchPlaceholder?: string;
    createSkill?: string;
    enabledOf: string;
    all: string;
    categories: string;
    filters: string;
    noSkills: string;
    noSkillsMatch: string;
    skillCount: string;
    resultCount: string;
    noDescription: string;
    toolsets: string;
    toolsetLabel: string;
    noToolsetsMatch: string;
    setupNeeded: string;
    disabledForCli: string;
    more: string;
    /** Optional — fall back to English literals until translated. */
    profileSelector?: string;
    currentProfile?: string;
    managingProfile?: string;
  };

  // ── Config page ──
  config: {
    fieldLabels?: Record<string, string>;
    configPath: string;
    filters: string;
    sections: string;
    exportConfig: string;
    importConfig: string;
    resetDefaults: string;
    resetScopeTooltip: string;
    confirmResetScope: string;
    resetScopeToast: string;
    rawYaml: string;
    searchResults: string;
    fields: string;
    noFieldsMatch: string;
    configSaved: string;
    yamlConfigSaved: string;
    failedToSave: string;
    failedToSaveYaml: string;
    failedToLoadRaw: string;
    configImported: string;
    invalidJson: string;
    /** /config — confirm dialog body before a scoped reset; "{count}" = field count. */
    confirmResetDescription?: string;
    /** /config — nested list editor item label; "{index}" = 1-based position. */
    /** /config — empty select option, e.g. the text type field. */
    /** /config — placeholder for list-type config fields. */
    categories: {
      general: string;
      agent: string;
      terminal: string;
      display: string;
      delegation: string;
      memory: string;
      compression: string;
      security: string;
      browser: string;
      voice: string;
      tts: string;
      stt: string;
      logging: string;
      discord: string;
      auxiliary: string;
    };
  };

  // ── Env / Keys page ──
  env: {
    changesNote: string;
    confirmClearMessage: string;
    confirmClearTitle: string;
    description: string;
    enterValue: string;
    getKey: string;
    hideAdvanced: string;
    hideValue: string;
    keysCount: string;
    llmProviders: string;
    notConfigured: string;
    notSet: string;
    providersConfigured: string;
    replaceCurrentValue: string;
    showAdvanced: string;
    showLess: string;
    showMore: string;
    showValue: string;
    customTitle: string;
    customHint: string;
    customConfigured: string;
    addCustomKey: string;
    customKeyName: string;
    customKeyNamePlaceholder: string;
    add: string;
    invalidKeyName: string;
    // Optional — added by the fa fork for strings that bypassed i18n.
    /** aria-label for the reveal toggle; "{key}" = env var name. */
    hideKey?: string;
    revealKey?: string;
    savedKey?: string;
    sectionProviders?: string;
    sectionTools?: string;
    sectionSettings?: string;
    jumpToSection?: string;
  };

  // ── OAuth ──
  oauth: {
    title: string;
    providerLogins: string;
    description: string;
    connected: string;
    expired: string;
    notConnected: string;
    runInTerminal: string;
    noProviders: string;
    login: string;
    disconnect: string;
    managedExternally: string;
    copied: string;
    copyCode: string;
    copyFailed: string;
    cli: string;
    copyCliCommand: string;
    connect: string;
    sessionExpires: string;
    sessionExpiredNoError: string;
    initiatingLogin: string;
    exchangingCode: string;
    connectedClosing: string;
    loginFailed: string;
    sessionExpired: string;
    reOpenAuth: string;
    reOpenVerification: string;
    submitCode: string;
    pasteCode: string;
    waitingAuth: string;
    enterCodePrompt: string;
    pkceStep1: string;
    pkceStep2: string;
    pkceStep3: string;
    flowLabels: {
      pkce: string;
      device_code: string;
      external: string;
    };
    expiresIn: string;
  };

  // ── Language switcher ──
  language: {
    switchTo: string;
  };

  // ── Theme switcher ──
  theme: {
    title: string;
    switchTheme: string;
    /** Font-override section (optional — locales fall back to English). */
    fontTitle?: string;
    fontDefault?: string;
    fontDefaultHint?: string;
    fontSans?: string;
    fontSerif?: string;
    fontMono?: string;
  };

  // ── Achievements plugin (plugins/hermes-achievements) ──
  achievements: {
    hero: {
      kicker: string;
      title: string;
      subtitle: string;
      scan_subtitle: string;
    };
    actions: {
      rescan: string;
    };
    stats: {
      unlocked: string;
      unlocked_hint: string;
      discovered: string;
      discovered_hint: string;
      secrets: string;
      secrets_hint: string;
      highest_tier: string;
      highest_tier_hint: string;
      latest: string;
      latest_hint_empty: string;
      none_yet: string;
    };
    state: {
      unlocked: string;
      discovered: string;
      secret: string;
    };
    tier: {
      target: string;
      hidden: string;
      complete: string;
      objective: string;
    };
    progress: {
      hidden: string;
    };
    scan: {
      building_headline: string;
      building_detail: string;
      starting_headline: string;
      progress_detail: string;
      idle_detail: string;
    };
    guide: {
      tiers_header: string;
      secret_header: string;
      secret_body: string;
      scan_status_header: string;
      scan_status_body: string;
      what_scanned_header: string;
      what_scanned_body: string;
    };
    card: {
      share_title: string;
      share_label: string;
      share_text: string;
      how_to_reveal: string;
      what_counts: string;
      evidence_label: string;
      evidence_session_fallback: string;
      no_evidence: string;
    };
    latest: {
      header: string;
    };
    empty: {
      no_secrets_header: string;
      no_secrets_body: string;
    };
    filters: {
      all_categories: string;
      visibility_all: string;
      visibility_unlocked: string;
      visibility_discovered: string;
      visibility_secret: string;
    };
    share: {
      dialog_label: string;
      header: string;
      close: string;
      rendering: string;
      card_alt: string;
      error_generic: string;
      x_title: string;
      x_button: string;
      copy_title: string;
      copy_button: string;
      copied: string;
      download_button: string;
      hint: string;
      clipboard_unsupported: string;
      tweet_text: string;
    };
  };

  // ── Kanban ──
  kanban: {
    loading: string;
    loadFailed: string;
    loadFailedHint: string;
    board: string;
    newBoard: string;
    newBoardTitle: string;
    newBoardDescription: string;
    slug: string;
    slugHint: string;
    displayName: string;
    displayNameHint: string;
    description: string;
    descriptionHint: string;
    icon: string;
    iconHint: string;
    switchAfterCreate: string;
    cancel: string;
    creating: string;
    createBoard: string;
    search: string;
    filterCards: string;
    tenant: string;
    allTenants: string;
    assignee: string;
    allProfiles: string;
    showArchived: string;
    lanesByProfile: string;
    nudgeDispatcher: string;
    refresh: string;
    selected: string;
    complete: string;
    archive: string;
    apply: string;
    clear: string;
    createTask: string;
    noTasks: string;
    unassigned: string;
    needsAssignee?: string;
    needsAssigneeHint?: string;
    untitled: string;
    loadingDetail: string;
    addComment: string;
    comment: string;
    status: string;
    workspace: string;
    skills: string;
    createdBy: string;
    result: string;
    comments: string;
    events: string;
    runHistory: string;
    workerLog: string;
    loadingLog: string;
    noWorkerLog: string;
    noDescription: string;
    noComments: string;
    edit: string;
    save: string;
    dependencies: string;
    parents: string;
    children: string;
    none: string;
    addParent: string;
    addChild: string;
    removeDependency: string;
    block: string;
    unblock: string;
    notifyHomeChannels: string;
    diagnostics: string;
    hide: string;
    show: string;
    attention: string;
    tasksNeedAttention: string;
    taskNeedsAttention: string;
    diagnostic: string;
    open: string;
    close: string;
    reassignTo: string;
    copied: string;
    copyCommand: string;
    reclaim: string;
    reassign: string;
    renderingError: string;
    reloadView: string;
    wsAuthFailed: string;
    markDone: string;
    markArchived: string;
    warning: string;
    phantomIds: string;
    active: string;
    ended: string;
    noProfile: string;
    showAllAttempts: string;
    sendingUpdates: string;
    sendNotifications: string;
    archiveBoardConfirm: string;
    archiveBoardTitle: string;
    boardSwitcherHint: string;
    taskCreatedWarning: string;
    moveFailed: string;
    bulkFailed: string;
    completionBlockedHallucination: string;
    suspectedHallucinatedReferences: string;
    pickProfileFirst: string;
    unblockedMessage: string;
    unblockFailed: string;
    reclaimedMessage: string;
    reclaimFailed: string;
    reassignedMessage: string;
    reassignFailed: string;
    selectForBulk: string;
    clickToEdit: string;
    clickToEditAssignee: string;
    emptyAssignee: string;
    columnLabels: {
      triage: string;
      todo: string;
      scheduled: string;
      ready: string;
      running: string;
      blocked: string;
      done: string;
      archived: string;
    };
    columnHelp: {
      triage: string;
      todo: string;
      scheduled: string;
      ready: string;
      running: string;
      blocked: string;
      done: string;
      archived: string;
    };
    confirmDone: string;
    confirmArchive: string;
    confirmBlocked: string;
    confirmScheduled?: string;
    confirmDoneMany: string;
    confirmArchiveMany: string;
    confirmBlockedMany: string;
    completionSummary: string;
    completionSummaryRequired: string;
    triagePlaceholder: string;
    taskTitlePlaceholder: string;
    specifier: string;
    assigneePlaceholder: string;
    priority: string;
    skillsPlaceholder: string;
    noParent: string;
    workspacePathDir: string;
    workspacePathOptional: string;
    logTruncated: string;
    logAt: string;
    // Optional keys added with the modal create-task dialog, board-settings
    // dialog, and comment workflow hint. Non-English locales fall back to
    // the English literal in the plugin bundle until translated, so these
    // are optional to avoid churning every locale file.
    newTaskTitle?: string;
    taskTitleLabel?: string;
    assigneeLabel?: string;
    assigneeLabelHint?: string;
    skillsLabel?: string;
    skillsLabelHint?: string;
    parentLabel?: string;
    parentLabelHint?: string;
    create?: string;
    boardSettings?: string;
    boardSettingsTitle?: string;
    boardSettingsTitleFor?: string;
    projectDirectoryOverrideHint?: string;
    saving?: string;
    commentHint?: string;
    commentHintTitle?: string;
    // Optional in-app confirm-dialog strings for the trash/delete flow;
    // non-English locales fall back to the English literals in the bundle.
    trash?: {
      confirmTitle?: string;
      confirmManyTitle?: string;
    };
  };

  // ── Channels (dashboard) ──
  // Optional namespace added by the fa fork for ChannelsPage strings that had
  // bypassed i18n. The whole namespace and every member is optional: locales
  // that haven't translated this section yet fall back to the English literal
  // in the component (`t.channels?.x ?? "English"`), and optional keeps the
  // other 17 locale files from needing a churn commit.
  channels?: {
    /** State vocabulary from the backend → badge label. */
    stateBadge?: {
      connected?: string;
      pending_restart?: string;
      gateway_stopped?: string;
      startup_failed?: string;
      disconnected?: string;
      not_configured?: string;
      disabled?: string;
      fatal?: string;
    };
    restarting?: string;
    restartGateway?: string;
    restartNow?: string;
    restartBanner?: string;
    /** "{configured}"/"{total}" = channel counts. */
    configuredCount?: string;
    configuredCountSuffix?: string;
    /** Trails the start command, which is rendered as <code>. */
    gatewayNotRunningPrefix?: string;
    gatewayNotRunningSuffix?: string;
    test?: string;
    configure?: string;
    /** "{name}" = platform display name. */
    configureNamed?: string;
    enableNamed?: string;
    useYourOwnTelegramBot?: string;
    botFatherGuide?: string;
    setupGuide?: string;
    telegramIntro?: string;
    telegramStep1Prefix?: string;
    telegramStep1Mid?: string;
    telegramStep1Suffix?: string;
    telegramStep2?: string;
    telegramStep3Prefix?: string;
    telegramStep3Suffix?: string;
    openBotFather?: string;
    findMyUserId?: string;
    telegramAllowedUsersHint?: string;
    redactedValue?: string;
    saveAndEnable?: string;
    saving?: string;
    callbackUrlShared?: string;
    pairWithQr?: string;
    starting?: string;
    existingSettingsConfigured?: string;
    mode?: string;
    bot?: string;
    selfChat?: string;
    allowedNumbers?: string;
    linked?: string;
    /** "{account}" = phone number or account name. */
    linkedAs?: string;
    deviceLinked?: string;
    existingSession?: string;
    waitingForQr?: string;
    scanLinkedDevices?: string;
    sharedNumbersNote?: string;
    saveAndRestart?: string;
    saveAndRestartGateway?: string;
    openChatLink?: string;
    whatsappQrAlt?: string;
    statusPreparing?: string;
    statusStarting?: string;
    waiting?: string;
    setupHelpReady?: string;
    setupHelpInstalling?: string;
    setupHelpStarting?: string;
    setupHelpScan?: string;
    linkedAccountDetailNumber?: string;
    linkedAccountDetail?: string;
    messageInstructionSelfChat?: string;
    messageInstruction?: string;
    keepAllowlist?: string;
    selfChatAllow?: string;
    pairingCodeNote?: string;
    chooseTelegramMethod?: string;
    telegramBothOptions?: string;
    quickSetup?: string;
    recommended?: string;
    quickSetupHint?: string;
    createWithQr?: string;
    useYourOwnBot?: string;
    manualSetupHint?: string;
    manualSetup?: string;
    telegramConfiguredNote?: string;
    finishOrCancel?: string;
    ready?: string;
    allowedUsers?: string;
    ownerDetected?: string;
    addAtLeastOneId?: string;
    telegramUserId?: string;
    add?: string;
    telegramQrAlt?: string;
    openTelegram?: string;
  };

  // ── Profile builder page (web) ──
  // Optional throughout (including the nested namespace) so that every
  // non-English locale keeps compiling while it lacks the translation; the
  // component falls back to the English literal (`t.profileBuilder?.x ?? "…"`).
  profileBuilder?: {
    newProfile?: string;
    profileName?: string;
    nameRule?: string;
    descriptionPlaceholder?: string;
    modelHint?: string;
    filterModels?: string;
    useDefaultLater?: string;
    keepAllBundle?: string;
    skillsKeepHint?: string;
    filterSkills?: string;
    loadingSkills?: string;
    addFromHub?: string;
    hubSearchPlaceholder?: string;
    searching?: string;
    search?: string;
    add?: string;
    remove?: string;
    removeSkillNamed?: string;
    mcpServers?: string;
    mcpServersHint?: string;
    configuredCount?: string;
    addServer?: string;
    serverName?: string;
    serverNamePlaceholder?: string;
    transport?: string;
    mcpTransport?: string;
    authentication?: string;
    httpAuthentication?: string;
    bearerToken?: string;
    tokenPlaceholder?: string;
    tokenNote?: string;
    oauthNote?: string;
    command?: string;
    args?: string;
    envLabel?: string;
    defaultSetLater?: string;
    fullDefaultBundle?: string;
    hubSkills?: string;
    back?: string;
    next?: string;
    createProfile?: string;
    creating?: string;
    steps?: {
      identity?: string;
      model?: string;
      skills?: string;
      mcp?: string;
      review?: string;
    };
  };

  // ── System (admin) page (web) ──
  system?: {
    host?: string;
    arch?: string;
    memory?: string;
    disk?: string;
    uptime?: string;
    loadAvg?: string;
    python?: string;
    checkForUpdates?: string;
    updateNow?: string;
    updateBehind?: string;
    updateAvailable?: string;
    latest?: string;
    /** /system — toast after a manual update check finds nothing new. */
    upToDate?: string;
    /** /system — portal row prefix, e.g. "inference provider: openrouter". */
    inferenceProviderPrefix?: string;
    /** /system — hardware stat unit ("15 cores · 12%"). */
    cores?: string;
    loggedIn?: string;
    notLoggedIn?: string;
    manageSubscription?: string;
    toolGatewayRouting?: string;
    skillCurator?: string;
    paused?: string;
    resume?: string;
    pause?: string;
    runNow?: string;
    curatorEvery?: string;
    curatorLastRun?: string;
    curatorNeverRun?: string;
    running?: string;
    stopped?: string;
    openLogs?: string;
    start?: string;
    restart?: string;
    stop?: string;
    servedByShared?: string;
    migrateHint?: string;
    migrateToSingle?: string;
    fixBlockersFirst?: string;
    externalProvider?: string;
    builtInOnly?: string;
    changeInPlugins?: string;
    providerSetup?: string;
    configureInPlugins?: string;
    providerMissingWarning?: string;
    resetMemoryMd?: string;
    resetUserMd?: string;
    resetAll?: string;
    credentialPool?: string;
    provider?: string;
    apiKey?: string;
    label?: string;
    optional?: string;
    addKey?: string;
    noCredentials?: string;
    removeCredential?: string;
    operations?: string;
    openConsole?: string;
    runDoctor?: string;
    securityAudit?: string;
    updateSkills?: string;
    promptSize?: string;
    supportDump?: string;
    migrateConfig?: string;
    fullBackup?: string;
    createBackup?: string;
    downloadBackup?: string;
    noBackupYet?: string;
    restoreFromUpload?: string;
    chooseRestoreZip?: string;
    noArchiveSelected?: string;
    restoreUpload?: string;
    restoreFromPath?: string;
    restorePath?: string;
    restore?: string;
    shareDebugReport?: string;
    shareDebugHint?: string;
    uploading?: string;
    generateShareLink?: string;
    redactRecommended?: string;
    uploaded?: string;
    redacted?: string;
    notRedacted?: string;
    autoDeletesIn?: string;
    copyAll?: string;
    copyLink?: string;
    logsFailedUpload?: string;
    checkpoints?: string;
    prune?: string;
    shellHooks?: string;
    newHook?: string;
    noHooks?: string;
    removeHook?: string;
    restartSharedTitle?: string;
    restartAll?: string;
    updateHermesTitle?: string;
    resetMemoryTitle?: string;
    resetMemoryDesc?: string;
    removeCredentialDesc?: string;
    pruneCheckpointsTitle?: string;
    pruneCheckpointsDesc?: string;
    removeHookTitle?: string;
    removeHookDesc?: string;
    restoreConfirmTitle?: string;
    restoreConfirmDesc?: string;
    newShellHook?: string;
    event?: string;
    commandAbsolutePath?: string;
    matcherOptional?: string;
    matcherPlaceholder?: string;
    approveNow?: string;
    shellHooksWarning?: string;
    createHook?: string;
    creatingHook?: string;
    closeLog?: string;
    done?: string;
    starting?: string;
    matcherLabel?: string;
    notExecutable?: string;
    allowed?: string;
    notApproved?: string;
  };

  // ── MCP page (web) ──
  // Optional throughout (including the namespace itself) so every non-English
  // locale keeps compiling while it lacks the translation; the component falls
  // back to the English literal (`t.mcp?.x ?? "…"`).
  mcp?: {
    addServer?: string;
    addServerTitle?: string;
    removeServer?: string;
    removeServerNamed?: string;
    removeServerGeneric?: string;
    name?: string;
    namePlaceholder?: string;
    transport?: string;
    authentication?: string;
    authNone?: string;
    bearerToken?: string;
    bearerTokenPlaceholder?: string;
    bearerTokenNote?: string;
    oauthNote?: string;
    command?: string;
    commandPlaceholder?: string;
    args?: string;
    argsPlaceholder?: string;
    envLabel?: string;
    add?: string;
    adding?: string;
    install?: string;
    installing?: string;
    installTitle?: string;
    installRequiresValues?: string;
    yourServers?: string;
    emptyServers?: string;
    restartNote?: string;
    envVarCount?: string;
    enable?: string;
    disable?: string;
    authenticate?: string;
    authenticateOAuth?: string;
    testConnection?: string;
    connectedNoTools?: string;
    toolsList?: string;
    connectionFailed?: string;
    browseCatalog?: string;
    catalogHeading?: string;
    catalogHint?: string;
    catalogEmpty?: string;
    badgeInstalled?: string;
    badgeDisabled?: string;
    endpoint?: string;
    runs?: string;
    installsFrom?: string;
    bootstrapCommands?: string;
    setupNotes?: string;
    sourceLink?: string;
  };

  // ── Webhooks page (web) ──
  webhooks?: {
    copy?: string;
    newSubscription?: string;
    deleteTitle?: string;
    deleteNamed?: string;
    deleteGeneric?: string;
    createdNote?: string;
    webhookUrl?: string;
    secretShownOnce?: string;
    done?: string;
    name?: string;
    namePlaceholder?: string;
    description?: string;
    descriptionPlaceholder?: string;
    events?: string;
    eventsPlaceholder?: string;
    deliverTo?: string;
    deliverLog?: string;
    deliverTelegram?: string;
    deliverDiscord?: string;
    deliverSlack?: string;
    deliverEmail?: string;
    deliverGithubComment?: string;
    deliverOnly?: string;
    deliverOnlyHint?: string;
    prompt?: string;
    promptPlaceholder?: string;
    create?: string;
    creating?: string;
    receiverDisabled?: string;
    receiverDisabledHint?: string;
    enableWebhooks?: string;
    enabling?: string;
    restartNeeded?: string;
    restartGateway?: string;
    restarting?: string;
    restartingNote?: string;
    enabledRestartingNote?: string;
    subscriptions?: string;
    subscriptionsHint?: string;
    noSubscriptions?: string;
    badgeDeliverOnly?: string;
    badgeDisabled?: string;
    badgeAllEvents?: string;
    enable?: string;
    disable?: string;
  };

  // ── Files page (web) ──
  // Optional throughout (namespace + members) so locales without the
  // translation keep compiling; FilesPage falls back to the English literal.
  filesPage?: {
    refreshFiles?: string;
    path?: string;
    pathRequired?: string;
    directoryUnavailable?: string;
    go?: string;
    upload?: string;
    createFolder?: string;
    folderName?: string;
    folderNameRequired?: string;
    folderCreated?: string;
    createFailed?: string;
    uploadFiles?: string;
    uploading?: string;
    releaseToUpload?: string;
    dropFilesHere?: string;
    chooseFiles?: string;
    loading?: string;
    loadingFiles?: string;
    uploadedCount?: string;
    uploadFailed?: string;
    downloadFailed?: string;
    deleted?: string;
    deleteFailed?: string;
    name?: string;
    size?: string;
    modified?: string;
    actions?: string;
    noFiles?: string;
    openNamed?: string;
    downloadNamed?: string;
    deleteNamed?: string;
    deleteItemTitle?: string;
    deleteNamedTitle?: string;
    deleteFolderDescription?: string;
    deleteFileDescription?: string;
    target?: string;
  };

  // ── Chat page chrome (web) ──
  // Optional throughout (including the nested namespace) so every non-English
  // locale keeps compiling while it lacks the translation; the component falls
  // back to the English literal (`t.chat?.x ?? "…"`).
  chat?: {
    reconnectChat?: string;
    reconnectNow?: string;
    /** Used for both the button label and its aria-label. */
    checkServerStatus?: string;
    startNewChatSession?: string;
    startNewSession?: string;
    openLogs?: string;
    copyLastResponseTitle?: string;
    copyLastResponse?: string;
    showSidePanelTitle?: string;
    showChatSidePanel?: string;
    collapseChatSidePanel?: string;
    collapseSidePanel?: string;
  };

  // ── Pairing page (web) ──
  pairing?: {
    revokeAccessTitle?: string;
    /** Confirm-button label and the revoke icon button's title/aria-label. */
    revoke?: string;
  };

  // ── Model info card (web) ──
  modelInfo?: {
    contextWindow?: string;
    maxOutput?: string;
    autoDetected?: string;
    /** "{n}" = the model's auto-detected context length. */
    overrideAuto?: string;
    capTools?: string;
    capVision?: string;
    capReasoning?: string;
  };

  // ── Console modal (web) ──
  consoleModal?: {
    title?: string;
    reconnect?: string;
    /** Reconnect button label + its aria-label. */
    reconnectConsole?: string;
    closeConsole?: string;
  };
}
