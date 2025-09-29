import { message } from "ant-design-vue"

export function uploadImage() {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.addEventListener('change', async () => {
      const file = input.files?.[0]
      if (!file) return reject(new Error('未选择文件'))

      const form = new FormData()
      form.append('image', file)

      try {
        const res = await fetch('/proxy/upload/image', {
          method: 'POST',
          body: form
        })
        const data = await res.json()

        if (res.ok && data.code === 200) {
          resolve(data.path)
          message.success('上传成功')
        } else {
          reject(new Error(data.msg || '上传失败'))
          message.error(data.msg || '上传失败')
        }
      } catch (err) {
        reject(err)
      } finally {
        input.remove()
      }
    })

    input.click()
  })
}