const client = require('../core/config_db')

const get_example_list = async function () {
    await client.connect()
    try {
        const res = await client.query('')
    } catch (err) {
        console.error(err);
    } finally {
    }
};

module.exports = get_example_list