
export const descTrim = (desc: string) => {
    return desc.length < 60 ? desc : desc.slice(0, 57) + '...'
}

export const setCookie = (cname: string | number, cvalue: string | number, exdays = 1) => {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    let expires = "expires=" + d.toUTCString()
    if (typeof window === 'object') document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

export const getCookie = (cname: string | number) => {
    if (typeof window === 'object') {
        let name = cname + "="
        let ca = document.cookie.split(";")
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) == " ") {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
        }
    }
    return ""
}

export const config = {
    headers: {
        Authorization: `Bearer ${getCookie("token")}`,
    },
}

export const title = "Antaratma"

export const sections = [
    { title: 'Home', url: '/' },
    { title: 'Pameran', url: '/pameran' },
    { title: 'Blog', url: '/artikel' },
    { title: 'Tentang Kami', url: '/about' },
];

export const sidebar = {
    title: "antaratma",
    description:
        "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
    archives: [
        { title: "March 2020", url: "#" },
        { title: "February 2020", url: "#" },
        { title: "January 2020", url: "#" },
        { title: "November 1999", url: "#" },
        { title: "October 1999", url: "#" },
        { title: "September 1999", url: "#" },
        { title: "August 1999", url: "#" },
        { title: "July 1999", url: "#" },
        { title: "June 1999", url: "#" },
        { title: "May 1999", url: "#" },
        { title: "April 1999", url: "#" },
    ]
}

export const posts: any = [
    `# Sample blog post

_April 1, 2020 by [Olivier](/)_

This blog post shows a few different types of content that are supported and styled with
Material styles. Basic typography, images, and code are all supported.
You can extend these by modifying \`Markdown.js\`.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.

Curabitur blandit tempus porttitor. **Nullam quis risus eget urna mollis** ornare vel eu leo.
Nullam id dolor id nibh ultricies vehicula ut id elit.

Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
Aenean lacinia bibendum nulla sed consectetur.

## Heading

Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

### Sub-heading 1

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

### Sub-heading 2

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.
Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
sit amet risus.

- Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
- Donec id elit non mi porta gravida at eget metus.
- Nulla vitae elit libero, a pharetra augue.

Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.

1. Vestibulum id ligula porta felis euismod semper.
1. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
1. Maecenas sed diam eget risus varius blandit sit amet non magna.

Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.
`,
]

export const data360: any = {
    // Scene 1
    1: [
        {
            type: "search",
            yaw: 232,
            pitch: -14,
            book: 1,
        },
        {
            type: "search",
            yaw: 133,
            pitch: -18,
            book: 2,
        },
        {
            type: "search",
            yaw: 186,
            pitch: -17,
            book: 3,
        },
        {
            type: "link",
            yaw: 94,
            pitch: -8,
            text: "Economy\nCulture",
        },
    ],
    // Scene 2
    2: [
        {
            type: "search",
            yaw: 120,
            pitch: -23,
            book: 4,
        },
        {
            type: "link",
            yaw: -100,
            pitch: -12,
            text: "Technology\nScience",
        },
    ],
}