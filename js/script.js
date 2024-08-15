window.addEventListener('load', function () {
    const form = document.getElementById('form-bmi');
    const radio1 = document.getElementById('radio1');
    const radio2 = document.getElementById('radio2');
    const usia = document.getElementById('usia');
    const berat = document.getElementById('berat-badan');
    const tinggi = document.getElementById('tinggi-badan');
    const lgender = document.getElementById('lgender');
    const lusia = document.getElementById('lusia');
    const lberat = document.getElementById('lberat');
    const ltinggi = document.getElementById('ltinggi');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const weight = parseFloat(berat.value);
        const height = parseFloat(tinggi.value);
        const men = radio1.checked;
        const women = radio2.checked;
        const age = parseInt(usia.value);

        // Reset pesan error sebelum validasi
        lberat.style.display = 'none';
        ltinggi.style.display = 'none';
        lusia.style.display = 'none';
        lgender.style.display = 'none';

        // Flag untuk cek validasi
        let valid = true;

        // Validasi input berat badan
        if (isNaN(weight) || weight <= 0) {
            lberat.style.display = 'block';
            valid = false; // Set valid menjadi false jika ada error
        }

        // Validasi input tinggi badan
        if (isNaN(height) || height <= 0) {
            ltinggi.style.display = 'block';
            valid = false;
        }

        // Validasi input usia
        if (isNaN(age) || age <= 0) {
            lusia.style.display = 'block';
            valid = false;
        }

        // Validasi gender
        if (!men && !women) {
            lgender.style.display = 'block';
            valid = false;
        }

        // Jika ada error, jangan hitung BMI
        if (!valid) {
            return;
        }

        // Jika valid, hitung BMI
        const bmi = (weight / (height / 100) ** 2).toFixed(2);

        document.getElementById('bmiValue').textContent = `BMI Anda: ${bmi}`;

        let title = '';
        let category = '';
        let message = '';
        let bmiRange = '';
        let healthRisks = '';

        if (bmi < 18.5) {
            title = 'Berat Badan Kurus';
            category = 'Kurus';
            bmiRange = '< 18.5';
            message =
                'Anda berada dalam kategori kurus. Disarankan untuk menambah asupan kalori makanan dan memperhatikan nutrisi yang seimbang.<br />Jika BMI Anda berada dalam kategori ini, maka Anda dianjurkan untuk meningkatkan berat badan hingga batas normal.';
            healthRisks = `
                <h5>Beberapa risiko penyakit yang terkait dengan kekurusan</h5>
                <p>Osteoporosis</p>
                <p>Gangguan Kesuburan</p>
                <p>Sistem Imun Lemah</p>
                <p>Anemia</p>`;
        } else if (bmi >= 18.5 && bmi < 25) {
            title = 'Berat Badan Normal';
            category = 'Normal';
            bmiRange = '18.5 - 22.9';
            message =
                'Anda berada dalam kategori normal. Pertahankan pola hidup sehat dengan menjaga asupan kalori dan rutin berolahraga.';
        } else if (bmi >= 25 && bmi < 30) {
            title = 'Berat Badan Overweight';
            category = 'Overweight';
            bmiRange = '23 - 24.9';
            message =
                'Anda berada dalam kategori overweight atau berat badan berlebih. Cara terbaik untuk menurunkan berat badan adalah dengan mengatur kalori makanan yang dikonsumsi dan berolahraga.<br />Jika BMI Anda berada dalam kategori ini, maka Anda dianjurkan untuk menurunkan berat badan hingga batas normal.';
            healthRisks = `
                <h5>Beberapa penyakit yang berasal dari kegemukan</h5>
                <p>Diabetes</p>
                <p>Hipertensi</p>
                <p>Sakit Jantung</p>
                <p>Osteoarthritis</p>`;
        } else {
            title = 'Berat Badan Obesitas';
            category = 'Obesitas';
            bmiRange = '≥ 30';
            message =
                'Anda berada dalam kategori obesitas. Sangat dianjurkan untuk berkonsultasi dengan ahli gizi atau dokter untuk program penurunan berat badan yang tepat.<br />Jika BMI Anda berada dalam kategori ini, maka Anda sangat dianjurkan untuk menurunkan berat badan hingga batas normal.';
            healthRisks = `
                <h5>Beberapa penyakit yang berasal dari kegemukan</h5>
                <p>Diabetes</p>g
                <p>Hipertensi</p>
                <p>Sakit Jantung</p>
                <p>Osteoarthritis</p>`;
        }

        document.getElementById('bmiTitle').textContent = `${title}`;

        document.getElementById('bmiCategory').innerHTML = `
            <strong>Kategori:</strong> ${category}<br />
            <p>Hasil BMI diantara ${bmiRange}</p>
            <p>${message}</p>`;

        // Tampilkan hasil
        document.querySelector('.overlay').style.display = 'block';
        document.getElementById('result').style.display = 'block';
    });

    // Jika ada tombol close atau klik overlay, sembunyikan modal dan overlay
    document.querySelector('.overlay').addEventListener('click', function () {
        document.querySelector('.overlay').style.display = 'none';
        document.getElementById('result').style.display = 'none';
    });

    // Event listener untuk menghilangkan pesan error pada input jenis kelamin
    radio1.addEventListener('change', function () {
        lgender.style.display = 'none';
    });

    radio2.addEventListener('change', function () {
        lgender.style.display = 'none';
    });

    // Event listeners untuk menghilangkan pesan error pada input usia
    usia.addEventListener('input', function () {
        lusia.style.display = 'none';
    });

    // Event listeners untuk menghilangkan pesan error pada input berat badan
    berat.addEventListener('input', function () {
        lberat.style.display = 'none';
    });

    // Event listeners untuk menghilangkan pesan error pada input tinggi badan
    tinggi.addEventListener('input', function () {
        ltinggi.style.display = 'none';
    });
});
