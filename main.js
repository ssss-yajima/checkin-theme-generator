(() => {
	// DOM要素は DOMContentLoaded 内で取得する
	let themeDisplay;
	let generateBtn;
	let categorySelect;
	// テーマデータは fetch で取得する
	let themesData = {};

	// themes.json を非同期で読み込む関数
	async function loadThemes() {
		try {
			const response = await fetch("themes.json");
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			themesData = await response.json();
			console.log("テーマデータを読み込みました:", themesData);
		} catch (error) {
			console.error("テーマデータの読み込みに失敗しました:", error);
			// エラー発生時、ユーザーに通知するなどの処理を追加できます
			if (themeDisplay) {
				themeDisplay.textContent = "テーマデータの読み込みに失敗しました。";
			}
		}
	}

	function populateCategories() {
		// themesData が空の場合は処理を中断
		if (Object.keys(themesData).length === 0) {
			console.error("populateCategories: themesData が空です。");
			return;
		}

		const categories = Object.keys(themesData);
		const categoryPrefixes = ["😊", "💡", "🚀", "🤝", "🎨"];
		categories.forEach((category, index) => {
			const option = document.createElement("option");
			option.value = category;
			const prefix = categoryPrefixes[index]
				? `${categoryPrefixes[index]} `
				: "";
			option.textContent = `${prefix}${category}`;
			// categorySelect はこの関数が呼ばれる時点で取得済みである必要がある
			if (categorySelect) {
				categorySelect.appendChild(option);
			} else {
				console.error("populateCategories: categorySelect が見つかりません。");
			}
		});
	}

	function generateTheme() {
		// categorySelect と themeDisplay はこの関数が呼ばれる時点で取得済みである必要がある
		if (!categorySelect || !themeDisplay) {
			console.error("generateTheme: 必要なDOM要素が見つかりません。");
			return;
		}
		// themesData が空の場合は処理を中断
		if (Object.keys(themesData).length === 0) {
			console.error("generateTheme: themesData が空です。");
			themeDisplay.textContent = "テーマデータが読み込まれていません。";
			return;
		}

		const selectedCategory = categorySelect.value;
		let themesToChooseFrom = [];

		if (selectedCategory === "all") {
			themesToChooseFrom = Object.values(themesData).flat();
		} else {
			themesToChooseFrom = themesData[selectedCategory];
		}

		if (!themesToChooseFrom || themesToChooseFrom.length === 0) {
			themeDisplay.textContent = "エラー：テーマが見つかりませんでした。";
			return;
		}

		const randomIndex = Math.floor(Math.random() * themesToChooseFrom.length);
		const randomTheme = themesToChooseFrom[randomIndex];

		// Add a subtle animation to the text display
		themeDisplay.style.transform = "scale(0.98)";
		themeDisplay.style.backgroundColor = "rgba(254, 249, 195, 0.8)"; // Light yellow highlight
		setTimeout(() => {
			themeDisplay.textContent = randomTheme;
			themeDisplay.style.transform = "scale(1)";
			themeDisplay.style.backgroundColor = "rgba(249, 250, 251, 0.75)"; // Back to default
		}, 150); // Short delay for the effect
	}

	// --- 初期化処理 ---
	document.addEventListener("DOMContentLoaded", async () => {
		// 先にDOM要素を取得
		themeDisplay = document.getElementById("themeDisplay");
		generateBtn = document.getElementById("generateBtn");
		categorySelect = document.getElementById("categorySelect");

		if (!themeDisplay || !generateBtn || !categorySelect) {
			console.error("初期化エラー: 必要なDOM要素が見つかりません。");
			return;
		}

		// テーマデータを非同期で読み込む
		await loadThemes();

		// データ読み込み後にカテゴリ生成とイベントリスナー設定
		// themesData が正常に読み込めたか確認してから populateCategories を呼ぶ
		if (Object.keys(themesData).length > 0) {
			populateCategories(); // DOM取得後、データ読み込み後にカテゴリを populate
			themeDisplay.textContent =
				"カテゴリを選んで「テーマを決定！」ボタンを押してね！";
			generateBtn.addEventListener("click", generateTheme);
		} else {
			// データ読み込み失敗時の処理（loadThemes内でエラー表示済みの場合が多い）
			themeDisplay.textContent =
				themeDisplay.textContent || "テーマデータの準備ができませんでした。";
		}
	});
})();
