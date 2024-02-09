import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded: {
    'wp:featuredmedia': [{ source_url: string }];
  };
  isExpanded?: boolean;
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://mikeethiopiatour.com/wp-json/wp/v2/posts?_embed');
        const data = await response.json();
        const postsWithExpansion = data.map((post: Post) => ({
          ...post,
          isExpanded: false,
        }));
        setPosts(postsWithExpansion);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const toggleExpansion = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index].isExpanded = !updatedPosts[index].isExpanded;
    setPosts(updatedPosts);
  };

  const renderPost = ({ item, index }: { item: Post; index: number }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => toggleExpansion(index)}>
        <Image 
          source={{ uri: item._embedded['wp:featuredmedia'] ? item._embedded['wp:featuredmedia'][0].source_url : 'https://mikeethiopiatour.com/wp-content/uploads/2023/10/Jan-Logo.png' }} 
          style={styles.image} 
        />
        <Text style={styles.title}>{item.title.rendered}</Text>
        <Text style={item.isExpanded ? styles.contentExpanded : styles.excerpt}>
          {item.isExpanded ? item.content.rendered.replace(/<\/?[^>]+(>|$)/g, "") : item.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")}
        </Text>
        <Text style={styles.readMore}>{item.isExpanded ? "Show Less" : "Read More"}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 8,
    color: '#65081B', 
  },
  excerpt: {
    marginTop: 8,
    fontSize: 19,
    color: '#65081B', 
  },
  contentExpanded: {
    marginTop: 8,
    color: '#000000', 
    fontSize: 24, 
  },
  readMore: {
    color: 'blue',
    marginTop: 8,
  },
});

export default Feed;


