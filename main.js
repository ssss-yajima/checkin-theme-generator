(() => {
	// --- Theme Generation Logic ---
	const themesByCategory = {
		今の状態・心境: [
			"今の気分をひとことで言うと？",
			"今日のエネルギーレベルは？ (1-5段階)",
			"今、一番頭の中を占めていることは？（軽く一言で）",
			"このミーティングに、どんな気持ちで臨んでいますか？",
			"今日の集中力を高めるために、何か工夫していることはありますか？",
		],
		最近の出来事・学び: [
			"最近あった、ちょっと嬉しかったことは？",
			"この1週間で学んだことや発見は？（小さなことでもOK）",
			"仕事（またはプライベート）で、小さな成功体験はありましたか？",
			"最近、思わず「へぇ！」と思ったことは？",
			"昨日一日を振り返って、一番印象に残っていることは？",
		],
		未来・期待: [
			"このミーティングで、特に話したいこと・聞きたいことは？（もしあれば）",
			"今日、どんな良いことがあると嬉しいですか？",
			"今週（または今日）、楽しみにしていることは？",
			"このミーティングが終わった時、どんな気分になっていたいですか？",
			"今日一日、どんな風に過ごしたいですか？",
		],
		チーム・関係性: [
			"このチームで一緒に仕事をしていて「面白いな」と感じる点は？",
			"最近、チームメンバーから（仕事に限らず）刺激を受けたことは？",
			"ちょっとした雑談：最近ハマっていること、教えてください！",
			"お互いをより良く知るために、聞いてみたい軽い質問は？",
			"このチームの「良いところ」を一つ挙げるとしたら？",
		],
		視点・探求: [
			"もし、今日一日を「色」で表すとしたら何色？",
			"最近見つけた、ちょっと面白いものや情報は？",
			"今日の仕事（または一日）を、どんな「一言」で始めたいですか？",
			"今の気分を天気で例えると？",
			"もし魔法が一つ使えるなら、今どんなことに使いたい？（小さなことでOK）",
		],
	};

	// DOM要素は DOMContentLoaded 内で取得する
	let themeDisplay, generateBtn, categorySelect;

	function populateCategories() {
		const categories = Object.keys(themesByCategory);
		const categoryPrefixes = ["😊", "💡", "🚀", "🤝", "🎨"];
		categories.forEach((category, index) => {
			const option = document.createElement("option");
			option.value = category;
			const prefix = categoryPrefixes[index]
				? categoryPrefixes[index] + " "
				: "";
			option.textContent = prefix + category;
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
		const selectedCategory = categorySelect.value;
		let themesToChooseFrom = [];

		if (selectedCategory === "all") {
			themesToChooseFrom = Object.values(themesByCategory).flat();
		} else {
			themesToChooseFrom = themesByCategory[selectedCategory];
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
	document.addEventListener("DOMContentLoaded", () => {
		themeDisplay = document.getElementById("themeDisplay");
		generateBtn = document.getElementById("generateBtn");
		categorySelect = document.getElementById("categorySelect");

		if (!themeDisplay || !generateBtn || !categorySelect) {
			console.error("初期化エラー: 必要なDOM要素が見つかりません。");
			return;
		}

		populateCategories(); // DOM取得後にカテゴリを populate
		themeDisplay.textContent =
			"カテゴリを選んで「テーマを決定！」ボタンを押してね！";
		generateBtn.addEventListener("click", generateTheme);
	});
})();
